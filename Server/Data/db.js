module.exports = function (env, table) {
  let config = require('../../knexfile')[env]
  let knex = require('knex')(config)

  return {
     getNotes: () => knex.select('id', 'content', 'display_order', 'title', 'archived')
                        .from(table)
                        .orderBy('display_order', 'desc'),

     getNote: (id) => knex(table)
                          .where('id', id)
                          .select('id', 'content', 'display_order', 'title', 'archived')
                          .catch((err) => {console.log(err)}),

     addNote: () => knex(table)
                      .insert({content: ""})
                      .returning('id'),

     getCount: () => knex(table)
                    .count('id'),

     editNote: (id, content, title) => knex(table)
                                .where('id', id)
                                .update({
                                  content,
                                  title
                                })
                                .catch((err) => {console.log(err)}),

     deleteNote: (id) => knex(table)
                          .where('id', id)
                          .del(),

     archiveToggleNote: (id, archived) => knex(table)
                                    .where('id', id)
                                    .update('archived', !archived)
  }
}
