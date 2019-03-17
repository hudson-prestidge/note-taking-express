module.exports = function (env, table) {
  let config = require('../../knexfile')[env]
  let knex = require('knex')(config)

  return {
     getNotes: () => knex.select('id', 'content', 'title', 'archived', 'time_posted')
                        .from(table)
                        .orderBy('id', 'desc'),

     getNote: (id) => knex(table)
                          .where('id', id)
                          .select('id', 'content', 'title', 'archived', 'time_posted')
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
