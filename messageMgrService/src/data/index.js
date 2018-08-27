const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true })

module.exports = {
  AutoReply: require('./AutoReply'),
  ReceiveMessage: require('./ReceiveMessage')
}
