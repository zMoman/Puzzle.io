
const canvas = document.getElementById('canvas1') //our drawing canvas
let words = []
let arrSplit=[] //lyrics split into array in wordsOutput function
const TOLERANCE = 20; // Tolerance for the vertical position

words.push({word: "We", x: Math.random()*canvas.width, y: Math.random()*canvas.height})
words.push({word: "like", x: Math.random()*canvas.width, y: Math.random()*canvas.height})
words.push({word: "javascript", x: Math.random()*canvas.width, y: Math.random()*canvas.height})




let timer 



function drawCanvas() {
  /*
  Call this function whenever the canvas needs to be redrawn.
  */

  const context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height) //erase canvas

  context.font = '20pt Arial'
  context.fillStyle = 'cornflowerblue'
  context.strokeStyle = 'blue'

  for (let i = 0; i < words.length; i++) {

    let data = words[i]
    context.fillText(data.word, data.x, data.y)
    context.strokeText(data.word, data.x, data.y)

  }


  context.stroke()
}

function getWordAtLocation(aCanvasX, aCanvasY) {
  
  const context = canvas.getContext('2d');

  for (let i = 0; i < words.length; i++) {
      words[i].stringWidth = context.measureText(words[i].word).width;

      // Check if click is within the horizontal boundaries of the word
      const isWithinHorizontalBoundaries = aCanvasX >= words[i].x && aCanvasX <= words[i].x + words[i].stringWidth;

      // Check if click is within the vertical boundaries (considering tolerance)
      const isWithinVerticalBoundaries = Math.abs(words[i].y - aCanvasY) < TOLERANCE;

      if (isWithinHorizontalBoundaries && isWithinVerticalBoundaries) {
          return words[i];
      }
  }

  return null;
}



//Adds song lyrics to words array to output to html.
function wordsOutput(arr)
{
  arrSplit=[];
  for(let i=0;i<arr.length;i++)
  {
    arrSplit[i]=arr[i].split(' ')
    
  }
  
  //console.log("arrSplit: "+arrSplit+"\n")
  
  for(let j=0;j<arrSplit.length;j++)
  {
    for(let word of arrSplit[j])
    {

      words.push({word: word, x: Math.random()*canvas.width, y: Math.random()*canvas.height})

      //console.log(word+"\n")
     
    }
  } 

  
}