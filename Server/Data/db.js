var config = require('../../knexfile').development
var knex = require('knex')(config)

var getNotes = () => knex.select('id', 'content', 'time_posted').from('notes').orderBy('display_order')

var addNote = () => knex('notes').insert({content: ""})

var getCount = () => knex('notes').count('id')

var editNote = (id, content) => knex('notes')
                            .where('id', id)
                            .update('content', content)
                            .catch((err) => {console.log(err)})


var deleteNote = (id) => knex('notes')
                      .where('id', id)
                      .del()
                      .catch((err) => {console.log(err)})

module.exports = {
  getNotes,
  addNote,
  getCount,
  editNote,
  deleteNote
}
