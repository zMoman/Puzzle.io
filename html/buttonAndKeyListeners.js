//KEY CODES
//should clean up these hard-coded key codes
const ENTER = 13
const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40


function handleKeyDown(e) {

  let keyCode = e.which
  if (keyCode == UP_ARROW | keyCode == DOWN_ARROW) {
    //prevent browser from using these with text input drop downs
    e.stopPropagation()
    e.preventDefault()
  }

}

function handleKeyUp(e) {
//  console.log("key UP: " + e.which)
  if (e.which == RIGHT_ARROW | e.which == LEFT_ARROW | e.which == UP_ARROW | e.which == DOWN_ARROW) {

    //create a JSON string representation of the data object
    let jsonString = JSON.stringify(dataObj)
    //DO NOTHING WITH THIS DATA FOR NOW


  }
  if (e.which == ENTER) {
    handleSubmitButton() //treat ENTER key like you would a submit
    document.getElementById('userTextField').value = ''

  }

  e.stopPropagation()
  e.preventDefault()

}


function handleSubmitButton() {

  //clear text area
  document.getElementById("text-area").innerHTML=""

  wordsArray=[];

  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {

  
    let userRequestObj = {text: userText}
    let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = ''
    //alert ("You typed: " + userText);

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)
        //console.log("typeof: " + typeof this.responseText)
        
        //expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)
        words.splice(0,words.length);
        words.push(...responseObj.songLines)
        //console.log("songlines: "+responseObj.songLines)
  
        wordsOutput(words);

        let textDiv = document.getElementById("text-area")
	      textDiv.innerHTML = textDiv.innerHTML + `<p> ${userText}</p>`
       
        



        drawCanvas()
      }
     

    }
    xhttp.open("POST", "userText") 
    xhttp.send(userRequestJSON) 
  }
}

