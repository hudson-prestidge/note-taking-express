var config = require('../../knexfile').development
var knex = require('knex')(config)

var getNotes = () => knex.select('id', 'content', 'time_posted').from('notes')

var addNote = id => knex('notes').insert({id: id, content: ""})

module.exports = {
  getNotes,
  addNote
}
