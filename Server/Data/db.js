var config = require('../../knexfile').development
var knex = require('knex')(config)

var getNotes = () => knex.select('id', 'content', 'time_posted').from('notes').orderBy('display_order')

var addNote = () => knex('notes').insert({content: ""})

var getCount = () => knex('notes').count('id')

var editNote = (id, content) => knex('notes').where('id', id).update('content', content)
// why is this line necessary for it to function?
.then((data)=> {})
//
module.exports = {
  getNotes,
  addNote,
  getCount,
  editNote
}
