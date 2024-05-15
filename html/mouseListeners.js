

let deltaX, deltaY ;
let wordsArray=[];
let wordIDCounter = 0;  // a global counter to assign unique IDs to words




function getCanvasMouseLocation(e) {
  //provide the mouse location relative to the upper left corner
  //of the canvas

  /*
  This code took some trial and error. If someone wants to write a
  nice tutorial on how mouse-locations work that would be great.
  */
  let rect = canvas.getBoundingClientRect()

  //account for amount the document scroll bars might be scrolled

  //get the scroll offset
  const element = document.getElementsByTagName("html")[0]
  let scrollOffsetX = element.scrollLeft
  let scrollOffsetY = element.scrollTop

  let canX = e.pageX - rect.left - scrollOffsetX
  let canY = e.pageY - rect.top - scrollOffsetY

  return {
    canvasX: canX,
    canvasY: canY
  }

}

function handleMouseDown(e) {
  
  let canvasMouseLoc = getCanvasMouseLocation(e);

  console.log("mouse down:" + canvasMouseLoc.canvasX + ", " + canvasMouseLoc.canvasY);

  wordBeingMoved = getWordAtLocation(canvasMouseLoc.canvasX, canvasMouseLoc.canvasY);

  if (wordBeingMoved) {
      
    // Check if the word being moved is already in the wordsArray based on its position
      let existingWordInArray = wordsArray.find(w => w.word === wordBeingMoved.word && w.x === wordBeingMoved.x && w.y === wordBeingMoved.y);
      if (existingWordInArray) {
          // Set the ID of the wordBeingMoved to match the existing word in the array
          wordBeingMoved.id = existingWordInArray.id;
      }

      deltaX = wordBeingMoved.x - canvasMouseLoc.canvasX;
      deltaY = wordBeingMoved.y - canvasMouseLoc.canvasY;

      document.getElementById('canvas1').addEventListener('mousemove', handleMouseMove);
      document.getElementById('canvas1').addEventListener('mouseup', handleMouseUp);
  }


  e.stopPropagation();
  e.preventDefault();

  drawCanvas();
}




function handleMouseMove(e) {

  console.log("mouse move");

  //get mouse location relative to canvas top left
  //var rect = canvas.getBoundingClientRect()
  //var canvasX = e.pageX - rect.left
  //var canvasY = e.pageY - rect.top

  let canvasMouseLoc = getCanvasMouseLocation(e)

  wordBeingMoved.x = canvasMouseLoc.canvasX + deltaX
  wordBeingMoved.y = canvasMouseLoc.canvasY + deltaY

  e.stopPropagation()

  drawCanvas()
}

function handleMouseUp(e) {
  console.log("mouse up");
  e.stopPropagation();

  // Remove mouse move and mouse up handlers
  document.getElementById('canvas1').removeEventListener('mousemove', handleMouseMove);
  document.getElementById('canvas1').removeEventListener('mouseup', handleMouseUp);

  if (wordBeingMoved) {
      let existingWord = wordsArray.find(w => w.id === wordBeingMoved.id);

      if (existingWord) {
          // Update the position of the existing word
          existingWord.x = wordBeingMoved.x;
          existingWord.y = wordBeingMoved.y;
      } else {
          // Add the wordBeingMoved to wordsArray with a new unique ID
          wordBeingMoved.id = wordIDCounter++;  // Assign a unique ID
          wordsArray.push(wordBeingMoved);
      }
  }

  drawCanvas(); 
}




//Sorts newly moved words into array.


function parseWordsToArray() {
  // Clear text area
  document.getElementById("text-area").innerHTML = "";
  let processedWords = [];
  
  
  // Sort the words first by y, then by x
  
  let sortedWords = wordsArray.sort((a, b) => {
      if (Math.abs(a.y - b.y) < TOLERANCE-5) {
          return a.x - b.x; // sort by x if y is close enough
      }
      return a.y - b.y;
  });
  
  // Extract just the word strings into a new array and insert newline characters

  for (let i = 0; i < sortedWords.length; i++) {
      processedWords.push(sortedWords[i].word);
      if (i < sortedWords.length - 1 && Math.abs(sortedWords[i+1].y - sortedWords[i].y) > TOLERANCE) {
          processedWords.push("<br>");
      }
      //console.log("sortedWord: "+sortedWords[i].word);
  }
  
  
  let finalString = processedWords.join(" ");

  //See if puzzle is solved correctly or incorrectly.
  let strCompare= processedWords.filter(str=>str!="<br>");
  let textDiv = document.getElementById("text-area");
  let correct=true;
  
  let strCompareIndex = 0;

for (let j = 0; j < arrSplit.length; j++) {
    for (let word of arrSplit[j]) {
        // Avoid checking against spaces, null, or empty strings
        if (word === " " || word === null || word === "") continue;
        
        if (word !== strCompare[strCompareIndex]) {
            correct = false;
            break;
        }
        strCompareIndex++;
    }
    if (!correct) break; // Exit the outer loop if a mismatch is found.
}


correct==true ? textDiv.innerHTML = textDiv.innerHTML + `<p style="color:green;">${finalString}</p>`:textDiv.innerHTML = textDiv.innerHTML + `<p style="color:red;">${finalString}</p>`;


}





