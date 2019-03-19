let noteData = [];
let viewingArchive = false;
const newButton = document.querySelector('#new-button')
const deleteButton = document.querySelector('#delete-button')
const archiveButton = document.querySelector('#archive-button')
const editButton = document.querySelector('#submit-note-changes-button')
const viewActiveButton = document.querySelector('#view-active-button')
const viewArchiveButton = document.querySelector('#view-archive-button')
const popup = document.querySelector('#notification-popup')
const popupText = document.querySelector('#notification-text')
const noteList = document.querySelector('#note-list')
const searchBar = document.querySelector('#search-bar')
const titleField = document.querySelector('#current-note-title')
const bodyField = document.querySelector('#current-note-body')
const timeField = document.querySelector('#current-note-time-posted')

window.addEventListener('load', function initApp() {
  let data = [];
  newButton.addEventListener('click', addNote)
  editButton.addEventListener('click', editNote)
  deleteButton.addEventListener('click', deleteNote)
  archiveButton.addEventListener('click', archiveToggleNote)
  viewArchiveButton.addEventListener('click', archiveDisplay)
  viewActiveButton.addEventListener('click', activeDisplay)
  titleField.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
        bodyField.focus()
      }
    })
  window.addEventListener('keyup', function(e){
    if(e.keyCode === 46) {
      deleteNote()
    }
    if(e.keyCode === 32 && document.activeElement.matches('.note')) {
      selectNote(document.activeElement)
      getNoteInfo(document.activeElement)
    }
  })
  popup.addEventListener('animationend', (e) => {
    popup.classList.remove('popping-up')
  })
  let getNotes = new XMLHttpRequest();
  getNotes.open('GET', '/api/v1/notes', true)
  getNotes.onload = function() {
    disableFields()
    data = JSON.parse(this.response);
    let currentNote;
    for(let i = 0; i < data.length; i++) {
      currentNote = noteList.appendChild(document.createElement("div"))
      if (data[i].archived) {
        currentNote.classList.add('note', 'archived-note', 'filtered')
      } else {
        currentNote.classList.add('note', 'active-note')
      }
      currentNote.classList.add(`note-id-${data[i].id}`)
      currentNote.addEventListener('click', clickNote)
      currentNote.tabIndex = 0;
      let title = currentNote.appendChild(document.createElement("h2"))
      title.classList.add('note-title')
      title.textContent = data[i].title
      let content = currentNote.appendChild(document.createElement("p"))
      content.classList.add('note-content')
      content.textContent = data[i].content
    }
    noteData = [...data]
    searchBar.addEventListener('keyup', function(e){
      let notes = document.querySelectorAll('.note')
      let searchTerm = new RegExp(searchBar.value, "i")
      let filteredNoteIds = noteData.filter(note =>
        searchTerm.test(note.content) || searchTerm.test(note.title)
      ).filter(note =>  note.archived === viewingArchive)
      .map(note => note.id)
      for(let j = 0; j < noteData.length; j++) {
        if(filteredNoteIds.includes(noteData[j].id)){
          notes[j].classList.remove('filtered')
        } else {
          notes[j].classList.add('filtered')
        }
      }
    })
  }
  getNotes.send();
})

const disableFields = function () {
  bodyField.setAttribute('disabled', true)
  titleField.setAttribute('disabled', true)
  editButton.setAttribute('disabled', true)
}

const enableFields = function () {
  bodyField.removeAttribute('disabled')
  titleField.removeAttribute('disabled')
  editButton.removeAttribute('disabled')
}

const archiveDisplay = function showArchivedNotes() {
  viewingArchive = true
  deselect()
  const searchBar = document.querySelector('#search-bar')
  searchBar.setAttribute('placeholder', 'search archive')
  searchBar.value = ''
  document.querySelector('#archive-button').innerHTML = 'Unarchive<i class="fa fa-archive"></i>'
  const activeNotes = document.querySelectorAll('.active-note')
  for(let i = 0; i < activeNotes.length; i++) {
    activeNotes[i].classList.add('filtered')
  }
  const archivedNotes = document.querySelectorAll('.archived-note')
  for(let j = 0; j < archivedNotes.length; j++) {
    archivedNotes[j].classList.remove('filtered')
  }
}

const activeDisplay = function showActiveNotes() {
  viewingArchive = false
  deselect()
  const searchBar = document.querySelector('#search-bar')
  searchBar.setAttribute('placeholder', 'search notes')
  searchBar.value = ''
  document.querySelector('#archive-button').innerHTML = 'Archive</br><i class="fa fa-archive"></i>'
  const activeNotes = document.querySelectorAll('.active-note')
  for(let i = 0; i < activeNotes.length; i++) {
    activeNotes[i].classList.remove('filtered')
  }
  const archivedNotes = document.getElementsByClassName('archived-note')
  for(let j = 0; j < archivedNotes.length; j++) {
    archivedNotes [j].classList.add('filtered')
  }
}

const addNote = function createNewActiveNote() {
  activeDisplay()
  const createNote = new XMLHttpRequest()
  createNote.open('POST', '/api/v1/notes')
  const noteList = document.querySelector('#note-list')
  createNote.onload = function() {
    const id = (JSON.parse(this.response))[0]
    initNote(id)
    clearSearch()
  }
  createNote.send()
  noteList.scrollTop = 0;
}

const clearSearch = function clearSearchFilter() {
  const notes = document.querySelectorAll('.active-note')
  searchBar.value = ""
  for (let i = 0; i < notes.length; i++) {
    notes[i].classList.remove('filtered')
  }
}

const initNote = function insertAndSetupNoteHTML(id) {
  const currentNote = noteList.insertBefore(document.createElement("div"), noteList.childNodes[0])
  currentNote.classList.add('note', 'active-note', `note-id-${id}`)
  selectNote(currentNote)
  titleField.value = ""
  titleField.focus()
  bodyField.value = ""
  currentNote.tabIndex = 0;
  const title = currentNote.appendChild(document.createElement("h2", { 'class': 'note-title'}))
  const content = currentNote.appendChild(document.createElement("p", { 'class': 'note-content'}))
  currentNote.addEventListener('click', clickNote)
  noteData = [{content: "", id: id, archived: false, title: ""}, ...noteData]
}

const editNote = function changeNoteContentAndTitle() {
  if (document.querySelector('#selected-note')) {
    const currentNote = document.querySelector('#selected-note')
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
  } else {
  }
}

const archiveToggleNote = function archiveOrUnarchiveNote() {
  if(document.querySelector('#selected-note')){
    const currentNote = document.querySelector('#selected-note')
    currentNote.removeAttribute('id')
    const noteId = currentNote.className.match(/note-id-(\d+)/i)[1]
    const newArchived = !currentNote.matches('.archived-note')
    const archNote = new XMLHttpRequest
    archNote.open('POST', `api/v1/notes/archive/${noteId}`)
    archNote.setRequestHeader("Content-Type", "application/json");
    archNote.onload = function () {
      if(currentNote.matches('.active-note')) {
        popupText.textContent = 'Note Archived!'
      } else {
        popupText.textContent = 'Note Unarchived!'
      }
      for(let i = 0; i < noteData.length; i++) {
        if (noteData[i].id == noteId) {
          noteData[i].archived = newArchived;
        }
      }
      currentNote.classList.toggle('active-note')
      currentNote.classList.toggle('archived-note')
      currentNote.classList.add('filtered')
      popup.classList.add('popping-up')
      deselect()
    }
    archNote.send(JSON.stringify({"archived": `${newArchived}`}))
  }
}

const deleteNote = function removeNoteData() {
  if(document.querySelector('#selected-note')){
    const currentNote = document.querySelector('#selected-note')
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
      currentNote.removeEventListener('click', clickNote)
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
  deselect()
}

const clickNote = function noteClickHandler() {
  selectNote(this)
  getNoteInfo(this)
}

const selectNote = function clearSelectionThenSelectNote(note) {
  deselect()
  enableFields()
  note.setAttribute('id', 'selected-note')
}

const deselect = function clearSelection () {
  titleField.value = ""
  bodyField.value = ""
  timeField.textContent = ""
  disableFields()
  if (document.querySelector('#selected-note')) {
    document.querySelector('#selected-note').removeAttribute('id')
  }
}

const getNoteInfo = function populateFormWithNoteData(note) {
  const getNote = new XMLHttpRequest();
  const noteId = note.className.match(/note-id-(\d+)/i)[1]
  getNote.open('GET', `/api/v1/notes/${noteId}`, true)
  getNote.onload = function() {
    const data = JSON.parse(this.response)[0]
    bodyField.value = data.content;
    titleField.value = data.title;
    timeField.textContent = `Note created at ${new Date(data['time_posted'])}`
  }
  getNote.send();
}
