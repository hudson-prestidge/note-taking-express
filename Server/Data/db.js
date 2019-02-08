var config = require('../../knexfile').development
var knex = require('knex')(config)

var getNotes = () => knex.select('id', 'content', 'time_posted').from('notes')

var addNote = () => knex('notes').insert({content: ""})

var getCount = () => knex('notes').count('id')

var editNote = (id, content) => knex('notes').where('id', id).update({content: content})

module.exports = {
  getNotes,
  addNote,
  getCount,
  editNote
}
