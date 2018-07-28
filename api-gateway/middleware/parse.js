const axios = require('axios')
const R = require('ramda')
const parseString = require('xml2js').parseString

const logger = require('../logger')
const serviceConfig = require('../service_config')

const findClient = (req, tag) => {
  let client = R.find(R.propEq('tag', tag))(req.app.clients || [])

  if (!client) {
    return axios.get(`${serviceConfig['/client']}/client`)
      .then(response => response.data)
      .then(clients => {
        req.app.clients = clients
        client = R.find(R.propEq('tag', tag))(req.app.clients || [])

        if (!client) {
          throw new Error('tag 关联不上 client')
        } else {
          return Promise.resolve(client)
        }
      })
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

    if (wxdata.xml) {
      wxdata = wxdata.xml
      wxdata.format = 'xml'
    }

    if (wxdata.json) {
      wxdata = wxdata.json
      wxdata.format = 'json'
    }

    findClient(req, tag).then(client => {
      wxdata.appId = client.appId
      wxdata.tag = req.params.tag
      req.body = wxdata
      next()
    }).catch(next)
  })
}

module.exports = { parse }
