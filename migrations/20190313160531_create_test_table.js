
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('testnotes').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('testnotes', function(t){
        t.increments('id').primary()
        t.string('content')
        t.dateTime('time_posted')
        t.string('title')
        t.integer('display_order')
        t.boolean('archived')
      })
    }
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('testnotes')
};
