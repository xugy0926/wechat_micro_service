const axios = require('axios')
const createError = require('http-errors')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')

const logger = require('./logger')
const { start, checkExpire } = require('./timingTask')
const { save, find, findOne } = require('./db')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.json())

app.get('/client', (req, res, next) => {
  find({}).then(clients => res.json(clients)).catch(next)
})

app.post('/client', (req, res, next) => {
  const data = req.body

  save(data)
    .then(() => {
      res.json({ msg: '添加成功' })
      checkExpire(data.appId, data.secretKey, data.expiresAt)
    })
    .catch(next)
})

app.get('/client/:tag', (req, res, next) => {
  const { tag = '' } = req.params
  findOne({ tag})
    .then(client => res.json({ client}))
    .catch(next)
})

app.get('/client/accesstoken/:appId', (req, res, next) => {
  const { appId } = req.params
  findOne({ appId})
    .then(({ secretKey, expiresAt, accessToken }) => {
      res.json({ accessToken})
      checkExpire(appId, secretKey, expiresAt)
    })
    .catch(next)
})

app.get('/client/menu/:tag', (req, res, next) => {
  const { tag } = req.params

  findOne({ tag}).then(({ accessToken }) => {
    return axios.get(`https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${accessToken}`)
      .then(response => response.data)
  })
    .then(({ errcode, errmsg, menu }) => {
      if (errcode === 0 && errmsg === 'ok') {
        res.json({errcode, errmsg, menu})
      } else {
        res.status(500).json({ errcode, errmsg})
      }
    })
    .catch(next)
})

app.post('/client/menu/:tag', (req, res, next) => {
  const { tag } = req.params
  findOne({ tag}).then(({ accessToken }) => {
    return axios.post(`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`, req.body)
      .then(response => response.data)
  })
    .then(({ errcode, errmsg }) => {
      if (errcode === 0 && errmsg === 'ok') {
        res.json({errcode, errmsg, menu})
      } else {
        res.status(500).json({ errcode, errmsg})
      }
    })
    .catch(next)
})

app.delete('/client/menu/:tag', (req, res, next) => {
  const { tag } = req.params
  findOne({ tag}).then(({ accessToken }) => {
    return axios.get(`https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${accessToken}`, req.body)
      .then(response => response.data)
  })
    .then(({ errcode, errmsg }) => {
      if (errcode === 0 && errmsg === 'ok') {
        res.json({errcode, errmsg})
      } else {
        res.status(500).json({ errcode, errmsg})
      }
    })
    .catch(next)
})

app.get('/client/custommenu/:tag', (req, res, next) => {
  const { tag } = req.params
  findOne({ tag}).then(({ accessToken }) => {
    return axios.get(`https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=${accessToken}`, req.body)
      .then(response => response.data)
  })
    .then(data => {
      res.json(data)
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

start()
app.listen(9000)
