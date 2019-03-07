let config = require('../../knexfile').development
let knex = require('knex')(config)

let getNotes = () => knex.select('id', 'content', 'display_order', 'title', 'archived').from('notes').orderBy('display_order', 'desc')

let getNote = (id) => knex('notes')
                      .where('id', id)
                      .select('id', 'content', 'display_order', 'title', 'archived')
                      .catch((err) => {console.log(err)})

let addNote = () => knex('notes').insert({content: ""}).returning('id')

let getCount = () => knex('notes').count('id')

let editNote = (id, content, title) => knex('notes')
                            .where('id', id)
                            .update({
                              content,
                              title
                            })
                            .catch((err) => {console.log(err)})

let deleteNote = (id) => knex('notes')
                      .where('id', id)
                      .del()

let archiveToggleNote = (id, archived) => knex('notes')
                                .where('id', id)
                                .update('archived', !archived)

module.exports = {
  archiveToggleNote,
  getNotes,
  getNote,
  addNote,
  getCount,
  editNote,
  deleteNote
}
