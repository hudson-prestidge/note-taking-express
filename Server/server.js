var path = require('path')
var express = require('express')
var db = require('./data/db')
var bodyParser = require('body-parser')

var notes = require('./routes/notes')

var app = express()

app.use(bodyParser.json())

app.use('/api/v1/notes', notes)

app.use(express.static(path.join(__dirname,'/../public')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/../../public/index.html')))

app.listen(3000)
console.log('app is running and listening on port 3000')