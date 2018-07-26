const express = require('express')
const bodyParser = require('body-parser')
const httpProxy = require('http-proxy')
const morgan = require('morgan')

const logger = require('./logger')
const { checkToken } = require('./middleware/wxtoken')
const { wxtarget, target } = require('./middleware/target')
const { parse } = require('./middleware/parse')

const proxy = httpProxy.createServer()
const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.text({ type: 'text/xml' }))

proxy.on('proxyReq', function (proxyReq, req, res, options) {
  if (!req.body || !Object.keys(req.body).length) {
    return
  }

  const bodyData = JSON.stringify(req.body)

  if (bodyData) {
    proxyReq.setHeader('Content-Type', 'application/json')
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
    proxyReq.write(bodyData)
  }
})

const goto = function (req, res, next) {
  proxy.web(req, res, {
    target: req.target
  }, (err) => {
    logger.error(err)
    res.status(500).end(req.target + ' error.')
  })
}

const clientRouter = express.Router()
clientRouter.all('*', (req, res, next) => {
  goto(req, res, next)
})

const wxRouter = express.Router()
wxRouter.get('/:tag', checkToken)
wxRouter.post('/:tag', parse, wxtarget, goto)

app.use('/wx', wxRouter)
app.use('/client', target('/client'), clientRouter)

module.exports = app
