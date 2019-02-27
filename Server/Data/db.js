var config = require('../../knexfile').development
var knex = require('knex')(config)

var getNotes = () => knex.select('id', 'content', 'time_posted', 'display_order').from('notes').orderBy('display_order')

var getNote = (id) => knex('notes')
                      .where('id', id)
                      .select('id', 'content', 'time_posted', 'display_order', 'title')
                      .catch((err) => {console.log(err)})

var addNote = () => knex('notes').insert({content: ""}).returning('id')

var getCount = () => knex('notes').count('id')

var editNote = (id, content, title) => knex('notes')
                            .where('id', id)
                            .update({
                              content,
                              title
                            })
                            .catch((err) => {console.log(err)})

var deleteNote = (id) => knex('notes')
                      .where('id', id)
                      .del()

module.exports = {
  getNotes,
  getNote,
  addNote,
  getCount,
  editNote,
  deleteNote
}
