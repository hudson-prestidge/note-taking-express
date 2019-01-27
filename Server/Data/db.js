var config = require('../../knexfile').development
var knex = require('knex')(config)

var getNotes = () => knex.select('id', 'content', 'time_posted').from('notes')

var addNote = () => knex('notes').insert({content: ""})

var getCount = () => knex('notes').count('id')

module.exports = {
  getNotes,
  addNote,
  getCount
}
