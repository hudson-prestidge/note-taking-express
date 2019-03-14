require('jsdom-global')()
const assert = require('assert')
const db = require('../server/data/db')('test', 'testnotes')

describe('Database tests', function() {
    it('can retrieve notes from the table', function(done){
      db.getNotes().then(done())
    })
})
