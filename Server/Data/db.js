var config = require('../../knexfile').development
var knex = require('knex')(config)

var getNotes = () => knex('notes')

var addNote = id => knex('notes').insert({id: id, content: ""})
