var express = require('express')
var bodyParser = require('body-parser')

var notes = require(`${__dirname}/server/routes/notes`)

var app = express()

app.use(bodyParser.json())

app.use('/api/v1/notes', notes)

app.use(express.static(`${__dirname}/public`))
app.get('/', (req, res) => res.sendFile(`${__dirname}/../public/index.html`))

app.listen(3000)
console.log('app is running and listening on port 3000')
