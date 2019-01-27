var config = require('../../knexfile').development
var knex = require('knex')(config)

var getNotes = () => knex.select('id', 'content', 'time_posted').from('notes

var addNote = (content) => knex('notes').insert({content: content})

module.exports = {
  getNotes,
  addNote
}
