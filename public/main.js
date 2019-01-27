var clickNote = function() {
  if (document.getElementById('selected-note')) {
    document.getElementById('selected-note').removeAttribute('id')
  }
  this.setAttribute('id', 'selected-note')
}

var request = new XMLHttpRequest();

request.open('GET', '/api/v1/notes', true)

request.onload = function() {
 var data = JSON.parse(this.response);
 var activeNotes = document.getElementsByClassName('active-notes')[0]
 var currentNote;
 for(var i = 0; i < data.length; i++) {
   currentNote = activeNotes.appendChild(document.createElement("div"))
   currentNote.classList.add('active-note')
   currentNote.innerHTML = data[i].content
   currentNote.addEventListener('click', clickNote)
 }
}




request.send();
