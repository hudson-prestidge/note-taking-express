var express = require('express')
var db = require('../data/db')
var router = express.Router();

router.get('/',(req, res) => {
  db.getNotes()
  .then(notes => res.send(notes))
  .catch(err => console.log(err))
})

router.post('/',(req, res) => {
  db.addNote()
  .catch(err => console.log(err))
})

router.put('/:id',(req, res) => {
  db.editNote(req.params.id, req.body.newContent)
  res.sendStatus(200)
})

router.delete('/:id', (req, res) => {
  db.deleteNote(req.params.id)
  res.sendStatus(200)
})

module.exports = router
