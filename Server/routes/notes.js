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
  console.log(req);
  // db.editNote(id, )
})

module.exports = router
