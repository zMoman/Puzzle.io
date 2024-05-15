
document.addEventListener('DOMContentLoaded', function() {
  //This is called after the browser has loaded the web page

  //add mouse down listener to our canvas object
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)
  //add listener to get button
  document.getElementById('get_button').addEventListener('click', handleSubmitButton)
  //solve
  document.getElementById('solve_button').addEventListener('click', parseWordsToArray)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)

  drawCanvas()
})
