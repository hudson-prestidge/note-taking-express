
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('testnotes').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('testnotes').insert([
        {id: 1, content: "first note", time_posted: knex.fn.now(), title: "first title", archived: false},
        {id: 2, content: "second note", time_posted: knex.fn.now(), title: "second title", archived: false},
        {id: 3, content: "this is the third note", time_posted: knex.fn.now(), title:"", archived: true},
        {id: 4, content: "fourth note", time_posted: knex.fn.now(), title: "first title", archived: false},
        {id: 5, content: "fifth note", time_posted: knex.fn.now(), title: "first title", archived: false},
        {id: 6, content: "sixth note", time_posted: knex.fn.now(), title: "first title", archived: false},
        {id: 7, content: "seventh note", time_posted: knex.fn.now(), title: "first title", archived: false},
        {id: 8, content: "eighth note", time_posted: knex.fn.now(), title: "first title", archived: false},
        {id: 9, content: "ninth note", time_posted: knex.fn.now(), title: "first title", archived: true},
        {id: 11, content: "The best damn content ever", time_posted: knex.fn.now(), title: "Anything you want it to be", archived: false}
      ]);
    });
};
