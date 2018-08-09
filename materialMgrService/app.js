const bodyParser = require('body-parser')
const createError = require('http-errors')
const express = require('express')
const morgan = require('morgan')

const config = require('./config')
const logger = require('./logger')
const { findOne } = require('./db')
const sync = require('./sync')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/material/fetch/:appId', (req, res, next) => {
  const appId = req.params.appId
  const type = req.query.type

  findOne({ appId, type }, { sort: '-createAt' })
    .then(res.send.bind(res))
    .catch(next)
})

app.post('/material/sync/:appId', (req, res, next) => {
  sync('news', req.body)
  res.send('success')
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  logger.error(err)
  res.status(err.status || 500)
  res.json({ msg: err.toString() })
})

app.listen(9003)
