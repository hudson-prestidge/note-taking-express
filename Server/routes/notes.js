var express = require('express')
var db = require('../Data/db')(process.env.NODE_ENV || 'development', 'notes')
var router = express.Router();

router.get('/',(req, res) => {
  db.getNotes()
  .then(notes => res.send(notes))
  .catch(err => console.log(err))
})

router.get('/:id',(req, res) => {
  db.getNote(req.params.id)
  .then(note => res.send(note))
  .catch(err => console.log(err))
})

router.post('/',(req, res) => {
  db.addNote()
  .then(data => res.send(data))
  .catch(err => console.log(err))
})

router.post('/:id',(req, res) => {
  db.editNote(req.params.id, req.body.newTitle, req.body.newContent)
    .then(data => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.post('/archive/:id',(req, res) => {
  db.setNoteArchived(req.params.id, req.body.archived)
    .then(data => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  db.deleteNote(req.params.id)
    .then(data => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
