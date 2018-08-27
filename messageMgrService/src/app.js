const bodyParser = require('body-parser')
const createError = require('http-errors')
const express = require('express')
const morgan = require('morgan')

const logger = require('./logger')
const { AutoReply, ReceiveMessage } = require('./data')
const reply = require('./reply')
const parseCmd = require('./middleware/parseCmd')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/message/:type/:tag', parseCmd, (req, res, next) => {
  ReceiveMessage.save(req.body)
    .then(reply)
    .then(res.send.bind(res))
    .catch(next)
})

app.post('/event/subscribe', (req, res, next) => {
  const { EventKey, Ticket } = req.body.event
})

app.post('/event/unsubscribe', (req, res, next) => {
})

app.post('/event/scan', (req, res, next) => {
  const { EventKey, Ticket } = req.body.event
})

app.post('/event/location', (req, res, next) => {
  const { Latitude, Longitude, Precision } = req.body.event
})

app.post('/event/click', (req, res, next) => {
  const { EventKey } = req.body.event
})

app.post('/reply/auto/:tag', (req, res, next) => {
  AutoReply.save(req.body)
    .then(res.json)
    .catch(next)
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  logger.error(err)
  res.status(err.status || 500)
  res.json({ msg: err })
})

app.listen(9001)
