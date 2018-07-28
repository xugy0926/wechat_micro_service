const httpProxy = require('http-proxy')

const logger = require('../logger')

const proxy = httpProxy.createServer()

proxy.on('proxyReq', (proxyReq, req, res, options) => {
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

const goto = (req, res) => {
  proxy.web(req, res, { target: req.target }, (err) => {
    logger.error(err)
    res.status(500).end(req.target + ' error.')
  })
}

module.exports = { goto }
