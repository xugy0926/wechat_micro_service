const bodyParser = require('body-parser')
const createError = require('http-errors')
const express = require('express')
const morgan = require('morgan')

const logger = require('./logger')
const { save } = require('./db')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/message/text/:tag', (req, res, next) => {
  const data = req.body
  save(data).then(() => res.send()).catch(next)
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  logger.error(err)
  res.status(err.status || 500)
  res.json({msg: err})
})

app.listen(9000)
