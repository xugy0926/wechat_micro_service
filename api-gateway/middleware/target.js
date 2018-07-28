const serviceConfig = require('../service_config')

const wxtarget = (req, res, next) => {
  switch (req.body.MsgType) {
    case 'text':
    case 'image':
    case 'voice':
    case 'video':
    case 'shortvideo':
    case 'location':
    case 'link':
      req.body.type = '/wxmessage'
      req.target = serviceConfig[req.body.type] + '/message/' + req.body.MsgType
      break
    case 'event': 
      req.body.type = '/wxevent'
      req.target = serviceConfig[req.body.type] + '/event/' + req.body.MsgType
    default:
      break
  }

  next()
}

const target = (tag) => {
  return (req, res, next) => {
    req.target = serviceConfig[tag] + req.baseUrl
    next()
  }
}

module.exports = { wxtarget, target }