let noteData = [];
const newButton = document.getElementById('new-button')
const deleteButton = document.getElementById('delete-button')
const archiveButton = document.getElementById('archive-button')
const editButton = document.getElementById('submit-note-changes-button')
const viewActiveButton = document.getElementById('view-active-button')
const viewArchiveButton = document.getElementById('view-archive-button')
const popup = document.getElementById('notification-popup')
const popupText = document.getElementById('notification-text')
const noteList = document.getElementById('note-list')
const searchBar = document.getElementById('search-bar')
const titleField = document.querySelector('.current-note-title')
const bodyField = document.querySelector('.current-note-body')

window.addEventListener('load', function initApp() {
  let data = [];
  newButton.addEventListener('click', addNote)
  editButton.addEventListener('click', editNote)
  deleteButton.addEventListener('click', deleteNote)
  archiveButton.addEventListener('click', archiveToggleNote)
  viewArchiveButton.addEventListener('click', archiveDisplay)
  viewActiveButton.addEventListener('click', activeDisplay)
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
  popup.addEventListener('animationend', (e) => {
    popup.classList.remove('popping-up')
  })
  let getNotes = new XMLHttpRequest();
  getNotes.open('GET', '/api/v1/notes', true)
  getNotes.onload = function() {
    data = JSON.parse(this.response);
    let currentNote;
    for(let i = 0; i < data.length; i++) {
      currentNote = noteList.appendChild(document.createElement("div"))
      if (data[i].archived) {
        currentNote.classList.add('note', 'archived-note')
      } else {
      currentNote.classList.add('note', 'active-note')
      }
      currentNote.classList.add(`note-id-${data[i].id}`)
      currentNote.addEventListener('click', clickNote)
      let title = currentNote.appendChild(document.createElement("h2", { 'class': 'note-title'}))
      title.textContent = data[i].title
      let content = currentNote.appendChild(document.createElement("p", { 'class': 'note-content'}))
      content.textContent = data[i].content
    }
    let notes = document.getElementsByClassName('note')
    noteData = Array.from(notes, ((note) => {
                    return {
                      title: note.childNodes[0].textContent,
                      content: note.childNodes[1].textContent,
                      id: note.className.match(/note-id-(\d+)/i)[1]
                    }
                  }))
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

const archiveDisplay = function showArchivedNotes() {
  const searchBar = document.getElementById('search-bar')
  searchBar.setAttribute('placeholder', 'search archive')
  searchBar.value = ''
  document.getElementById('archive-button').innerHTML = 'Unarchive<i class="fa fa-archive"></i>'
  const activeNotes = document.getElementsByClassName('active-note')
  for(let i = 0; i < activeNotes.length; i++) {
    activeNotes[i].style.display = 'none';
  }
  const archivedNotes = document.getElementsByClassName('archived-note')
  for(let j = 0; j < archivedNotes.length; j++) {
    archivedNotes[j].style.display = 'block';
  }
}

const activeDisplay = function showActiveNotes() {
  const searchBar = document.getElementById('search-bar')
  searchBar.setAttribute('placeholder', 'search notes')
  searchBar.value = ''
  document.getElementById('archive-button').innerHTML = 'Archive</br><i class="fa fa-archive"></i>'
  const activeNotes = document.getElementsByClassName('active-note')
  for(let i = 0; i < activeNotes.length; i++) {
    activeNotes[i].style.display = 'block';
  }
  const archivedNotes = document.getElementsByClassName('archived-note')
  for(let j = 0; j < archivedNotes.length; j++) {
    archivedNotes[j].style.display = 'none';
  }
}

const addNote = function createNewActiveNote() {
  activeDisplay()
  const createNote = new XMLHttpRequest()
  createNote.open('POST', '/api/v1/notes')
  const noteList = document.getElementById('note-list')
  createNote.onload = function() {
    const id = (JSON.parse(this.response))[0]
    initNote(id)
    clearSearch()
  }
  createNote.send()
  noteList.scrollTop = 0;
}

const clearSearch = function clearSearchFilter() {
  const notes = document.getElementsByClassName('active-note')
  searchBar.value = ""
  for (let i = 0; i < notes.length; i++) {
    notes[i].classList.remove('filtered')
  }
}

const initNote = function insertAndSetupNoteHTML(id) {
  const currentNote = noteList.insertBefore(document.createElement("div"), noteList.childNodes[0])
  currentNote.classList.add('note', 'active-note')
  currentNote.classList.add(`note-id-${id}`)
  selectNote(currentNote)
  titleField.value = ""
  titleField.focus()
  bodyField.value = ""
  const title = currentNote.appendChild(document.createElement("h2", { 'class': 'note-title'}))
  const content = currentNote.appendChild(document.createElement("p", { 'class': 'note-content'}))
  currentNote.addEventListener('click', clickNote)
  noteData = [{content: "", id: id}, ...noteData]
}

const editNote = function changeNoteContentAndTitle() {
  if (document.getElementById('selected-note')) {
    const currentNote = document.getElementById('selected-note')
    const noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
    const editNote = new XMLHttpRequest
    const newContent = bodyField.value
    const newTitle = titleField.value
    editNote.open('POST', `/api/v1/notes/${noteId}`)
    editNote.setRequestHeader("Content-Type", "application/json");
    editNote.onload = function() {
      currentNote.childNodes[0].textContent = newTitle
      currentNote.childNodes[1].textContent = newContent
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

const archiveToggleNote = function archiveOrUnarchiveNote() {
  if(document.getElementById('selected-note')){
    const currentNote = document.getElementById('selected-note')
    currentNote.removeAttribute('id')
    const noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
    const archived = currentNote.classList.contains('archived-note')
    const archNote = new XMLHttpRequest
    archNote.open('POST', `api/v1/notes/archive/${noteId}`)
    archNote.send(JSON.stringify({"archived": `${archived}`}))
    archNote.onload = function () {
      if(currentNote.classList.contains('active-note')) {
        popupText.textContent = 'Note Archived!'
      } else {
        popupText.textContent = 'Note Unarchived!'
      }
      currentNote.classList.toggle('active-note')
      currentNote.classList.toggle('archived-note')
      popup.classList.add('popping-up')
      currentNote.style.display = 'none'
      document.querySelector('.current-note-title').value = ""
      document.querySelector('.current-note-body').value = ""
    }
  }
}

const deleteNote = function removeNoteData() {
  if(document.getElementById('selected-note')){
    const currentNote = document.getElementById('selected-note')
    const noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
    for(let j = 0; j < noteData.length; j++) {
      if (noteData[j].id == noteId) {
        noteData.splice(j, 1)
      }
    }
    const delNote = new XMLHttpRequest
    delNote.open('DELETE', `api/v1/notes/${noteId}`)
    delNote.send()
    delNote.onload= function () {
      popupText.textContent = 'Note Deleted!'
      popup.classList.add('popping-up')
      currentNote.style.animation = 'growOut 140ms'
      currentNote.style["-webkit-animation"] = 'growOut 140ms'
      currentNote.style["-moz-animation"] = 'growOut 140ms'
      currentNote.addEventListener('animationend', cleanUpNote)
      currentNote.addEventListener('webkitAnimationEnd', cleanUpNote)
    }
  }
}

const cleanUpNote = function removeNoteHTML() {
  this.parentElement.removeChild(this)
  document.querySelector('.current-note-title').value = ""
  document.querySelector('.current-note-body').value = ""
}

const clickNote = function noteClickHandler() {
  selectNote(this)
  getNoteInfo(this)
}

const selectNote = function clearSelectionThenSelectNote(note) {
  if (document.getElementById('selected-note')) {
    document.getElementById('selected-note').removeAttribute('id')
  }
  note.setAttribute('id', 'selected-note')
}

const getNoteInfo = function populateFormWithNoteData(note) {
  const getNote = new XMLHttpRequest();
  const noteId = note.className.match(/note-id-(\d+)/i)[1]
  getNote.open('GET', `/api/v1/notes/${noteId}`, true)
  getNote.onload = function() {
    const data = JSON.parse(this.response)
    bodyField.value = data[0].content;
    titleField.value = data[0].title;
  }
  getNote.send();
}
