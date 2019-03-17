require('jsdom-global')()
const assert = require('assert')
const db = require('../server/data/db')('test', 'testnotes')

describe('Database function tests', function() {

    it('getNotes() correctly retrieves all notes from the table', function (done) {
      db.getNotes().then(function (data) {
        assert.strictEqual(data.length, 10, "incorrect number of notes returned")
        done()
      }).catch(err => done(err))
    })

    it('getNotes() can access the properties of retrieved notes', function (done) {
      db.getNotes().then(function (data) {
        const has = Object.prototype.hasOwnProperty;
        assert(has.call(data[0], 'id'), "can't access id property")
        assert.strictEqual(data[0].id, 11, "can't access id property")
        assert(has.call(data[0], 'content'), "can't access content property")
        assert.strictEqual(data[0].content, "The best damn content ever", "can't access content property")
        assert(has.call(data[0], 'title'), "can't access title property")
        assert.strictEqual(data[0].title, "Anything you want it to be", "can't access title property")
        assert(has.call(data[0], 'archived'), "can't access archived property")
        assert(!data[0].archived, "can't access archived property")
        assert(has.call(data[0], 'time_posted'), "can't access time posted property")
        done()
      }).catch(err => done(err))
    })

    it('getNote() correctly retrieves one note from the table', function (done) {
      db.getNote(3).then(function (data) {
        assert.strictEqual(data.length, 1)
        done()
      }).catch(err => done(err))
    })

    it('getNote() can access the properties of the retrieved note', function (done) {
      db.getNote(3).then(function (data) {
        const note = data[0]
        const has = Object.prototype.hasOwnProperty
        assert(has.call(note, 'id'), "can't access id property")
        assert.strictEqual(note.id, 3, "can't access id property")
        assert(has.call(note, 'content'), "can't access content property")
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
      db.addNote().then(function (data) {
        assert.strictEqual(data[0], 12, "returning incorrect id after adding note")
        done()
      }).catch(err => done(err))
    })

    it('getNotes() correctly retrieves all notes after adding one', function (done) {
      db.getNotes().then(function (data) {
        assert.strictEqual(data.length, 11, "incorrect number of notes returned")
        done()
      }).catch(err => done(err))
    })

    it('editNote() can modify the content and title of a note', function (done) {
      db.editNote(3, 'new title', 'new content').then(function () {
        db.getNote(3).then(function (data) {
          const note = data[0]
          const has = Object.prototype.hasOwnProperty
          assert(has.call(note, 'content'), "can't access content property")
          assert.strictEqual(note.content, "new content", "can't access content property")
          assert(has.call(note, 'title'), "can't access title property")
          assert.strictEqual(note.title, "new title", "can't access title property")
          done()
        }).catch(err => done(err))
      }).catch(err => done(err))
    })

    it(`deleteNote() can remove a note from the database`, function (done) {
      db.deleteNote(12).then(function () {
        db.getNotes().then(function (data) {
          assert.strictEqual(data.length, 10, "incorrect number of notes returned")
          done()
        })
      }).catch(err => done(err))
    })

    it('setNoteArchived() can change the archived status of a note', function (done) {
      db.setNoteArchived(3, false).then(function () {
        db.getNote(3).then(function (data) {
          const note = data[0]
          const has = Object.prototype.hasOwnProperty
          assert(has.call(note, 'archived'), "can't access archived property")
          assert(!note.archived, "has not changed archived property")
          done()
        }).catch(err => done(err))
      }).catch(err => done(err))
    })
})
