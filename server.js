var path = require('path')
var express = require('express')

var app = express()

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(3000)
console.log('app is running and listening on port 3000')
