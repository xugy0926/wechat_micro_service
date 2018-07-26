const logger = require('../logger')
const parseString = require('xml2js').parseString

const parse = (req, res, next) => {
  parseString(req.body, { explicitArray: false }, function (err, wxdata) {
    if (err) {
      logger.error(err)
      return res.send(err)
    }

    wxdata.tag = req.params.tag
    req.body = wxdata
    console.log(req.body);
    next()
  })
}

module.exports = { parse }
