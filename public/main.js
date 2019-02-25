
var newButton;
var deleteButton;
var editButton;

window.addEventListener('load', function() {
  newButton = document.getElementById('new-button')
  deleteButton = document.getElementById('delete-button')
  editButton = document.getElementById('submit-note-changes-button')
  newButton.addEventListener('click', addNewNote)
  editButton.addEventListener('click', editNote)
  deleteButton.addEventListener('click', deleteNote)
  window.addEventListener('keyup', function(e){
    if(e.keyCode == 46) {
      deleteNote()
    }
  })
})


var addNewNote = function() {
  var createNote = new XMLHttpRequest()
  createNote.open('POST', '/api/v1/notes')
  createNote.onload = function() {
    let id = (JSON.parse(this.response))[0]
    let currentNote = document.getElementById('note-list')
              .appendChild(document.createElement("div"))
    currentNote.classList.add('active-note')
    currentNote.classList.add(`note-id-${id}`)
    currentNote.addEventListener('click', clickNote)
    var content = currentNote.appendChild(document.createElement("p"))
  }
  createNote.send()
}

let editNote = function() {
  let currentNote = document.getElementById('selected-note')
  let noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
  let editNote = new XMLHttpRequest
  let headerField = document.getElementsByClassName('current-note-header')[0]
  let bodyField = document.getElementsByClassName('current-note-body')[0]
  let newContent = bodyField.value
  editNote.open('POST', `/api/v1/notes/${noteId}`)
  editNote.setRequestHeader("Content-Type", "application/json");

  editNote.onload = function() {
    currentNote.childNodes[0].innerHTML = newContent;
  }

  editNote.send(JSON.stringify({"newContent": `${newContent}`}))
}

let deleteNote = function() {
  if(document.getElementById('selected-note')){
    let currentNote = document.getElementById('selected-note')
    let noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
    let deleteNote = new XMLHttpRequest
    deleteNote.open('DELETE', `api/v1/notes/${noteId}`)
    deleteNote.send()
    currentNote.parentElement.removeChild(currentNote)
    document.getElementsByClassName('current-note-header')[0].value = ""
    document.getElementsByClassName('current-note-body')[0].value = ""
  }
}

let clickNote = function() {
  if (document.getElementById('selected-note')) {
    document.getElementById('selected-note').removeAttribute('id')
  }
  let getNote = new XMLHttpRequest();
  let noteId = this.className.match(/note-id-(\d+)/i)[1]
  getNote.open('GET', `/api/v1/notes/${noteId}`, true)
  getNote.onload = function() {
    let data = JSON.parse(this.response)
    let headerField = document.getElementsByClassName('current-note-header')[0]
    //header field unused until database changed, but stored here for future use
    let bodyField = document.getElementsByClassName('current-note-body')[0]
    bodyField.value = data[0].content;
  }

  getNote.send();
  this.setAttribute('id', 'selected-note')
}

let getNotes = new XMLHttpRequest();

getNotes.open('GET', '/api/v1/notes', true)

getNotes.onload = function() {
 let data = JSON.parse(this.response);
 let noteList = document.getElementById('note-list')
 let currentNote;
 for(var i = 0; i < data.length; i++) {
   currentNote = noteList.appendChild(document.createElement("div"))
   currentNote.classList.add('active-note')
   currentNote.classList.add(`note-id-${data[i].id}`)
   currentNote.addEventListener('click', clickNote)
   var content = currentNote.appendChild(document.createElement("p"))
   content.innerHTML = data[i].content
 }
}


getNotes.send();
