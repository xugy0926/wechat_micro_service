const bodyParser = require('body-parser')
const express = require('express')
const createError = require('http-errors')
const morgan = require('morgan')

const logger = require('./logger')
const { start, checkExpire } = require('./timingTask')
const { save, findOne } = require('./db')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.json())

app.get('/client/:tag', async (req, res, next) => {
  const { tag = '' } = req.params

  try {
    let doc = await findOne({ tag })
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

app.get('/client/accesstoken/:appId', async (req, res, next) => {
  const { appId = '' }  = req.params

  try {
    let { secretKey, expiresAt, accessToken } = await findOne({ appId })
    checkExpire(appId, secretKey, expiresAt)
    res.json({ accessToken })
  } catch (err) {
    next(err)
  }
})

app.post('/client', (req, res, next) => {
  const data  = req.body

  save(data)
    .then(() => {
      res.json({ msg: '添加成功' })
      checkExpire(data.appId, data.secretKey, data.expiresAt)
    })
    .catch(next)
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  logger.info(err.toString())
  res.status(err.status || 500)
  res.json({msg: err.toString()})
})

start()
app.listen(9001)
