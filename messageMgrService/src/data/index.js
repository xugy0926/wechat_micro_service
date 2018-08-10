const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true })

const AutoReply = require('./AutoReply')
const ReceiveMessage = require('./ReceiveMessage')

module.exports = {
  AutoReply,
  ReceiveMessage,
}


