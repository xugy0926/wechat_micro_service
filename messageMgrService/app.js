const bodyParser = require('body-parser')
const express = require('express')
const createError = require('http-errors')
const morgan = require('morgan')

const logger = require('./logger')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/message/text/:tag', (req, res, next) => {
  const data = req.body
  logger.info(data)
  res.send()
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  logger.info(err.toString())
  res.status(err.status || 500)
  res.json({msg: err.toString()})
})

app.listen(9000)
