const R = require('ramda')
const parseString = require('xml2js').parseString

const logger = require('../logger')

const parse = (req, res, next) => {
  const { tag } = req.params
  const { appId } = req.client

  parseString(req.body, { explicitArray: false }, (err, wxdata) => {
    if (err) {
      logger.error(err)
      return res.send(err)
    }

    let data = {}

    if (wxdata.xml) {
      wxdata = wxdata.xml
      data.format = 'xml'
    }

    if (wxdata.json) {
      wxdata = wxdata.json
      wxdata.format = 'json'
    }

    data.MsgType = wxdata.MsgType
    data.MsgId = wxdata.MsgId
    data.ToUserName = wxdata.ToUserName
    data.FromUserName = wxdata.FromUserName
    data[data.MsgType] = wxdata

    data.appId = appId
    data.tag = tag
    data.client = req.client
    req.body = data
    next()
  })
}

module.exports = { parse }
