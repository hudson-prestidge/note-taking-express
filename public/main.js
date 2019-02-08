var newButton = document.getElementById('new-button')

  //

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
    currentNote.setAttribute("contenteditable", "false")
    putNote.send(JSON.stringify({"newContent": `${currentNote.childNodes[0].innerHTML}`}))
  }
  else {
    currentNote.classList.add('editing-note')
    currentNote.setAttribute("contenteditable", "true")
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
   editButton.addEventListener('click', editNote)
   var deleteButton = currentNote.appendChild(document.createElement("button"))
   deleteButton.classList.add('delete-button')
 }
}

newButton.addEventListener('click', addNewNote)

getNotes.send();
