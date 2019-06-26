const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
// app.use(jsonParser)
// app.use(teamRouter)
const port = process.env.PORT || 4000
const db = require('./db')
const Team = require('./team/model')
const Player = require('./player/model')
const teamRouter = require('./team/router')
const playerRouter = require('./player/router')

app.listen(port, function () {
    console.log(`Web server listening on port :${port}`)
})

app.use(jsonParser)
app.use(teamRouter)
app.use(playerRouter)