require('jsdom-global')()
const assert = require('assert')
const db = require('../server/data/db')('test', 'testnotes')

describe('Database function tests', function() {

    it('getNotes() correctly retrieves all notes from the table', function (done) {
      db.getNotes().then(data => {
        assert.strictEqual(data.length, 10)
        done()
      }).catch(err => done(err))
    })

    it('getNotes() can access the properties of retrieved notes', function (done) {
      db.getNotes().then(data => {
        const has = Object.prototype.hasOwnProperty;
        assert(has.call(data[0], 'id'))
        assert.strictEqual(data[0].id, 11)
        assert(has.call(data[0], 'content'))
        assert.strictEqual(data[0].content, "The best damn content ever")
        assert(has.call(data[0], 'title'))
        assert.strictEqual(data[0].title, "Anything you want it to be")
        assert(has.call(data[0], 'archived'))
        assert(!data[0].archived)
        assert(has.call(data[0], 'time_posted'))
        done()
      }).catch(err => done(err))
    })

    it('getNote() correctly retrieves one note from the table', function (done) {
      db.getNote(3).then(data => {
        assert.strictEqual(data.length, 1)
        done()
      }).catch(err => done(err))
    })

    it('getNote() can access the properties of the retrieved note', function (done) {
      db.getNote(3).then(data => {
        const note = data[0]
        const has = Object.prototype.hasOwnProperty;
        assert(has.call(note, 'id'), "can't access id property")
        assert.strictEqual(note.id, 3, "can't access id property")
        assert(has.call(note, 'content') , "can't access content property")
        assert.strictEqual(note.content, "this is the third note", "can't access content property")
        assert(has.call(note, 'title'), "can't access title property")
        assert.strictEqual(note.title, "", "can't access title property")
        assert(has.call(note, 'archived'), "can't access archived property")
        assert(note.archived, "can't access archived property")
        assert(has.call(note, 'time_posted'), "can't access time posted property")
        done()
      }).catch(err => done(err))
    })

    it(`addNote() can add a note to the database and return that note's id`, function (done) {
      db.addNote().then(data => {
        assert.strictEqual(data[0], 12, "returning incorrect id after adding note")
        done()
      }).catch(err => done(err))
    })

    it('getNotes() correctly retrieves all notes after adding one', function (done) {
      db.getNotes().then(data => {
        assert.strictEqual(data.length, 11)
        done()
      }).catch(err => done(err))
    })

})
