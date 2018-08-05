const bodyParser = require('body-parser')
const createError = require('http-errors')
const express = require('express')
const morgan = require('morgan')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const addDays = require('date-fns/add_days')

const config = require('./config')
const logger = require('./logger')
const { findOne, save } = require('./db')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/user/signin', (req, res, next) => {
  const name = req.body.name
  const password = req.body.password

  findOne({ name })
    .then(user => user.toObject())
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.encode(
            Object.assign(user, {
              exp: addDays(new Date(), 30).valueOf()
            }),
            config.secret)

          res.json({user, token})
        } else {
          throw new Error('密码错误')
        }
      } else {
        throw new Error('账号不存在')
      }
    })
    .catch(next)
})

app.post('/user/signup', (req, res, next) => {
  const name = req.body.name
  const password = req.body.password

  const passwordHash = bcrypt.hashSync(password, 10);

  save({ name, password: passwordHash })
    .then(user => {
      if (user) {
        res.json({ message: '注册成功' })
      }
    })
    .catch(next)
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  logger.error(err)
  res.status(err.status || 500)
  res.json({msg: err.toString()})
})

app.listen(9002)
