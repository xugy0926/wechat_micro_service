const R = require('ramda')
const parseString = require('xml2js').parseString

const logger = require('../logger')

const findClient = (req, tag) => {
  let client = R.find(R.propEq('tag', tag))(req.app.clients || [])

  if (!client) {
    throw new Error('tag 关联不上 client')
  } else {
    return Promise.resolve(client)
  }
}

const parse = (req, res, next) => {
  const tag = req.params.tag

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

    findClient(req, tag).then(client => {
      data.appId = client.appId
      data.tag = req.params.tag
      req.body = data
      next()
    }).catch(next)
  })
}

module.exports = { parse}
