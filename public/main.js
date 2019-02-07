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
 var noteSection = document.getElementsByClassName('note-section')[0]
 var currentNote;
 for(var i = 0; i < data.length; i++) {
   currentNote = noteSection.appendChild(document.createElement("div"))
   currentNote.classList.add('active-note')
   currentNote.classList.add(`note-id-${data[i].id}`)
   currentNote.addEventListener('click', clickNote)
   var content = currentNote.appendChild(document.createElement("p"))
   content.innerHTML = data[i].content
 }
 var activeNotes = document.getElementsByClassName('active-note')
 for(var i = 0; i < activeNotes.length; i++) {
   currentNote = activeNotes[i];
   var editButton = currentNote.appendChild(document.createElement("button"))
   editButton.classList.add('edit-button')
   var deleteButton = currentNote.appendChild(document.createElement("button"))
   deleteButton.classList.add('delete-button')
 }
}

editButton.addEventListener('click', editNote)
newButton.addEventListener('click', addNewNote)

getNotes.send();
