var path = require('path')
var express = require('express')
var db = require('./data/db')

var notes = require('./routes/notes')

var app = express()

app.use('/api/v1/notes', notes)

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/../index.html')))
app.post('/', (req, res) => console.log('posted to index!'))
app.use('/public', express.static(path.join(__dirname, '/../public')))

//temporary


//temporary

app.listen(3000)
console.log('app is running and listening on port 3000')
