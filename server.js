const express = require('express')
const bodyParser = require('body-parser')

const notes = require(`${__dirname}/Server/routes/notes`)

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.use('/api/v1/notes', notes)

app.use(express.static(`${__dirname}/public`))
app.get('/', (req, res) => res.sendFile(`${__dirname}/../public/index.html`))

app.listen(PORT)
console.log(`app is running and listening on port ${PORT}`)
