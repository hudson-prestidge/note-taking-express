
var newButton;
var deleteButton;
var editButton;

window.addEventListener('load', function() {
  let data = [];
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
  let getNotes = new XMLHttpRequest();
  getNotes.open('GET', '/api/v1/notes', true)
  getNotes.onload = function() {
  data = JSON.parse(this.response);
  let currentNote;
  let noteList = document.getElementById('note-list')
  for(let i = 0; i < data.length; i++) {
    currentNote = noteList.appendChild(document.createElement("div"))
    currentNote.classList.add('active-note')
    currentNote.classList.add(`note-id-${data[i].id}`)
    currentNote.addEventListener('click', clickNote)
    let content = currentNote.appendChild(document.createElement("p"))
    content.innerHTML = data[i].content
    }
    let searchBar = document.getElementById('search-bar')
    let notes = document.getElementsByClassName('active-note')
    let noteData = Array.from(notes)
                    .map((note) => {
                    return {
                      content: note.childNodes[0].innerHTML,
                      id: note.className.match(/note-id-(\d+)/i)[1]
                    }
                    })
    searchBar.addEventListener('keyup', function(e){
      let searchTerm = new RegExp(searchBar.value, "i")
      let filteredNoteIds = noteData.filter((note) => {
        return searchTerm.test(note.content)
      }).map(note => note.id)
      for(let j = 0; j < noteData.length; j++) {
        if(filteredNoteIds.includes(noteData[j].id)){
          notes[j].classList.remove('hidden')
        }else {
          notes[j].classList.add('hidden')
        }
      }
    })
  }
  getNotes.send();
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
    if (document.getElementById('selected-note')) {
      document.getElementById('selected-note').removeAttribute('id')
    }
    currentNote.setAttribute('id', 'selected-note')
    document.getElementsByClassName('current-note-title')[0].value = ""
    document.getElementsByClassName('current-note-body')[0].value = ""
    currentNote.addEventListener('click', clickNote)
    var content = currentNote.appendChild(document.createElement("p"))
  }
  createNote.send()
}

let editNote = function() {
  let currentNote = document.getElementById('selected-note')
  let noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
  let editNote = new XMLHttpRequest
  let titleField = document.getElementsByClassName('current-note-title')[0]
  let bodyField = document.getElementsByClassName('current-note-body')[0]
  let newContent = bodyField.value
  let newTitle = titleField.value
  editNote.open('POST', `/api/v1/notes/${noteId}`)
  editNote.setRequestHeader("Content-Type", "application/json");
  editNote.onload = function() {
    currentNote.childNodes[0].innerHTML = newContent
  }
  editNote.send(JSON.stringify({"newContent": `${newContent}`,"newTitle": `${newTitle}`}))
}

let deleteNote = function() {
  if(document.getElementById('selected-note')){
    let currentNote = document.getElementById('selected-note')
    let noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
    let deleteNote = new XMLHttpRequest
    deleteNote.open('DELETE', `api/v1/notes/${noteId}`)
    deleteNote.send()
    deleteNote.onload= function () {
      currentNote.style.animation = 'growOut 140ms'
      currentNote.addEventListener('animationend', function() {
        currentNote.parentElement.removeChild(currentNote)
        document.getElementsByClassName('current-note-title')[0].value = ""
        document.getElementsByClassName('current-note-body')[0].value = ""
      })
    }
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
    let titleField = document.getElementsByClassName('current-note-title')[0]
    let bodyField = document.getElementsByClassName('current-note-body')[0]
    bodyField.value = data[0].content;
    titleField.value = data[0].title;
  }
  getNote.send();
  this.setAttribute('id', 'selected-note')
}
