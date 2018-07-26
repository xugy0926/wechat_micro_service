const serviceConfig = require('../service_config')

const wxtarget = (req, res, next) => {
  req.body.type = '/wxmessage'
  switch (req.body.xml.MsgType) {
    case 'text':
    case 'image':
    case 'voice':
    case 'video':
    case 'shortvideo':
    case 'location':
    case 'link':
      req.target = serviceConfig[req.body.type] + '/message/' + req.body.xml.MsgType
      break
    default:
      break
  }

  next()
}

const target = function (tag) {
  return function (req, res, next) {
    req.target = serviceConfig[tag] + req.baseUrl
    next()
  }
}

module.exports = { wxtarget, target }