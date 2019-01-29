var newButton = document.getElementById('new-button')
var editButton = document.getElementById('edit-button')
var deleteButton = document.getElementById('delete-button')

  // var noteId = noteToEdit.className.match(/note-id-(\d+)/i)[1]

var addNewNote = function() {
  var postNote = new XMLHttpRequest()
  postNote.open('POST', '/api/v1/notes')
  window.location.reload()
  postNote.send()
}

var editNote = function() {
  var noteToEdit = document.getElementById('selected-note')
  if (noteToEdit) {
    noteToEdit.classList.toggle('editing-note')
  }
}

var clickNote = function() {
  if (document.getElementById('selected-note')) {
    document.getElementById('selected-note').removeAttribute('id')
  }
  this.setAttribute('id', 'selected-note')
}


var getNotes = new XMLHttpRequest();

getNotes.open('GET', '/api/v1/notes', true)

getNotes.onload = function() {
 var data = JSON.parse(this.response);
 var activeNotes = document.getElementsByClassName('active-notes')[0]
 var currentNote;
 for(var i = 0; i < data.length; i++) {
   currentNote = activeNotes.appendChild(document.createElement("div"))
   currentNote.classList.add('active-note')
   currentNote.classList.add(`note-id-${data[i].id}`)
   currentNote.innerHTML = data[i].content
   currentNote.addEventListener('click', clickNote)
 }
}

editButton.addEventListener('click', editNote)
newButton.addEventListener('click', addNewNote)

getNotes.send();
