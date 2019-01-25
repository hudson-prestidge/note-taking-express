var request = new XMLHttpRequest();

request.open('GET', '/api/v1/notes', true)

request.onload = function() {
 var data = JSON.parse(this.response);
 console.table(data);
 var activeNotes = document.getElementsByClassName('active-notes')[0]
 var currentNote;
 for(var i = 0; i < data.length; i++) {
   currentNote = activeNotes.appendChild(document.createElement("div"))
   currentNote.innerHTML = data[i].content
 }
}
request.send();
