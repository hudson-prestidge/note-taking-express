var newButton = document.getElementById('new-button')

var addNewNote = function() {
  var postNote = new XMLHttpRequest()
  postNote.open('POST', '/api/v1/notes')
  window.location.reload()
  postNote.send()
}

var editNote = function() {
  var currentNote = this.parentElement
  var noteId = currentNote.className.match(/note-id-(\d+)/i)[1]

  if(currentNote.classList.contains('editing-note')) {
    var putNote = new XMLHttpRequest
    putNote.open('PUT', `/api/v1/notes/${noteId}`)
    putNote.setRequestHeader("Content-Type", "application/json");
    currentNote.classList.remove('editing-note')
    currentNote.childNodes[0].setAttribute("contenteditable", "false")
    putNote.send(JSON.stringify({"newContent": `${currentNote.childNodes[0].innerHTML}`}))
  }
  else {
    currentNote.classList.add('editing-note')
    currentNote.childNodes[0].setAttribute("contenteditable", "true")
    currentNote.childNodes[0].focus()
  }
}

var deleteNote = function() {
  if(confirm('Are you sure you want to delete this note?')){
  var currentNote = this.parentElement
  var noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
  var deleteNote = new XMLHttpRequest
  deleteNote.open('DELETE', `api/v1/notes/${noteId}`)
  deleteNote.send()
  currentNote.parentElement.removeChild(currentNote)
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
 var noteList = document.getElementById('note-list')
 var currentNote;
 for(var i = 0; i < data.length; i++) {
   currentNote = noteList.appendChild(document.createElement("div"))
   currentNote.classList.add('active-note')
   currentNote.classList.add(`note-id-${data[i].id}`)
   currentNote.addEventListener('click', clickNote)
   var content = currentNote.appendChild(document.createElement("p"))
   content.innerHTML = data[i].content
 }
}

newButton.addEventListener('click', addNewNote)

getNotes.send();
