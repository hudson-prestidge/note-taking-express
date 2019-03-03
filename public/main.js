
let newButton;
let deleteButton;
let editButton;
let noteData = [];

window.addEventListener('load', function() {
  let data = [];
  newButton = document.getElementById('new-button')
  deleteButton = document.getElementById('delete-button')
  editButton = document.getElementById('submit-note-changes-button')
  titleField = document.getElementsByClassName('current-note-title')[0]
  newButton.addEventListener('click', addNewNote)
  editButton.addEventListener('click', editNote)
  deleteButton.addEventListener('click', deleteNote)
  titleField.addEventListener('keyup', function(e) {
    if(e.keyCode == 13) {
        document.getElementsByClassName('current-note-body')[0].focus()
      }
    })
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
      let title = currentNote.appendChild(document.createElement("h2"))
      title.classList.add('note-title')
      title.innerHTML = data[i].title
      let content = currentNote.appendChild(document.createElement("p"))
      content.classList.add('note-content')
      content.innerHTML = data[i].content
    }
    let searchBar = document.getElementById('search-bar')
    let notes = document.getElementsByClassName('active-note')
    noteData = Array.from(notes)
                    .map((note) => {
                    return {
                      title: note.childNodes[0].innerHTML,
                      content: note.childNodes[1].innerHTML,
                      id: note.className.match(/note-id-(\d+)/i)[1]
                    }
                    })
    searchBar.addEventListener('keyup', function(e){
      let searchTerm = new RegExp(searchBar.value, "i")
      let filteredNoteIds = noteData.filter((note) => {
        return searchTerm.test(note.content) || searchTerm.test(note.title)
      }).map(note => note.id)
      for(let j = 0; j < noteData.length; j++) {
        if(filteredNoteIds.includes(noteData[j].id)){
          notes[j].classList.remove('filtered')
        }else {
          notes[j].classList.add('filtered')
        }
      }
    })
  }
  getNotes.send();
})

let addNewNote = function() {
  var createNote = new XMLHttpRequest()
  createNote.open('POST', '/api/v1/notes')
  let noteList = document.getElementById('note-list')
  createNote.onload = function() {
    let id = (JSON.parse(this.response))[0]
    initNote(id)
    clearSearchFilter()
  }
  createNote.send()
  noteList.scrollTop = 0;
}

let clearSearchFilter = function() {
  let searchBar = document.getElementById('search-bar')
  let notes = document.getElementsByClassName('active-note')
  searchBar.value = ""
  for (let i = 0; i < notes.length; i++) {
    notes[i].classList.remove('filtered')
  }
}

let initNote = function(id) {
  let noteList = document.getElementById('note-list')
  let currentNote = noteList.insertBefore(document.createElement("div"), noteList.childNodes[0])
  currentNote.classList.add('active-note')
  currentNote.classList.add(`note-id-${id}`)
  selectNote(currentNote)
  document.getElementsByClassName('current-note-title')[0].value = ""
  document.getElementsByClassName('current-note-title')[0].focus()
  document.getElementsByClassName('current-note-body')[0].value = ""
  let title = currentNote.appendChild(document.createElement("h2"))
  title.classList.add('note-title')
  let content = currentNote.appendChild(document.createElement("p"))
  content.classList.add('note-content')
  currentNote.addEventListener('click', clickNote)
  noteData = [{content: "", id: id}, ...noteData]
}

let editNote = function() {
  if (document.getElementById('selected-note')) {
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
      currentNote.childNodes[0].innerHTML = newTitle
      currentNote.childNodes[1].innerHTML = newContent
      for(let i = 0; i < noteData.length; i++) {
        if (noteData[i].id == noteId) {
          noteData[i].content = newContent;
          noteData[i].title = newTitle;
        }
      }
    }
    editNote.send(JSON.stringify({"newContent": `${newContent}`,"newTitle": `${newTitle}`}))
  }
}

let deleteNote = function() {
  if(document.getElementById('selected-note')){
    let currentNote = document.getElementById('selected-note')
    let noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
    for(let j = 0; j < noteData.length; j++) {
      if (noteData[j].id == noteId) {
        noteData.splice(j, 1)
      }
    }
    let delNote = new XMLHttpRequest
    delNote.open('DELETE', `api/v1/notes/${noteId}`)
    delNote.send()
    delNote.onload= function () {
      currentNote.style.animation = 'growOut 140ms'
      currentNote.style["-webkit-animation"] = 'growOut 140ms'
      currentNote.style["-moz-animation"] = 'growOut 140ms'
      currentNote.addEventListener('animationend', cleanUpNote)
      currentNote.addEventListener('webkitAnimationEnd', cleanUpNote)
    }
  }
}

let cleanUpNote = function() {
  this.parentElement.removeChild(this)
  document.getElementsByClassName('current-note-title')[0].value = ""
  document.getElementsByClassName('current-note-body')[0].value = ""
}

let clickNote = function() {
  selectNote(this)
  getNoteInfo(this)
}

let selectNote = function (note) {
  if (document.getElementById('selected-note')) {
    document.getElementById('selected-note').removeAttribute('id')
  }
  note.setAttribute('id', 'selected-note')
}

let getNoteInfo = function(note) {
  let getNote = new XMLHttpRequest();
  let noteId = note.className.match(/note-id-(\d+)/i)[1]
  getNote.open('GET', `/api/v1/notes/${noteId}`, true)
  getNote.onload = function() {
    let data = JSON.parse(this.response)
    let titleField = document.getElementsByClassName('current-note-title')[0]
    let bodyField = document.getElementsByClassName('current-note-body')[0]
    bodyField.value = data[0].content;
    titleField.value = data[0].title;
  }
  getNote.send();
}
