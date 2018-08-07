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
      req.target = `${serviceConfig['/message']}/message/${req.body.MsgType}/${req.params.tag}`
      break
    case 'event': 
      req.target = `${serviceConfig['/event/']}${req.body.MsgType}/${req.params.tag}`
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