
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('testnotes').del()
    .then(function () {
      // Inserts seed entries
      return knex('testnotes').insert([
        {id: 1, content: "first note", time_posted: knex.fn.now(), title: "first title", display_order: 1, archived: false},
        {id: 2, content: "second note", time_posted: knex.fn.now(), title: "second title", display_order: 2, archived: false},
        {id: 3, content: "this is the third note", time_posted: knex.fn.now(), title:"", display_order: 3, archived: true},
        // {id: 4, content: "fourth note", time_posted:, title:, display_order:, archived:},
        // {id: 5, content: "fifth note", time_posted:, title:, display_order:, archived:},
        // {id: 6, content: "sixth note", time_posted:, title:, display_order:, archived:},
        // {id: 7, content: "seventh note", time_posted:, title:, display_order:, archived:},
        // {id: 8, content: "eighth note", time_posted:, title:, display_order:, archived:},
        // {id: 9, content: "ninth note", time_posted:, title:, display_order:, archived:},
        // {id: 10, content: "tenth note", time_posted:, title:, display_order:, archived:},

      ]);
    });
};
