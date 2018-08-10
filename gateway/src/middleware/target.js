const serviceURL = require('../serviceURL')

const wxtarget = (req, res, next) => {
  switch (req.body.MsgType) {
    case 'text':
    case 'image':
    case 'voice':
    case 'video':
    case 'shortvideo':
    case 'location':
    case 'link':
      req.target = `${serviceURL['/message']}/message/${req.body.MsgType}/${req.client.tag}`
      break
    case 'event': 
      req.target = `${serviceURL['/event/']}${req.body.MsgType}/${req.client.tag}`
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