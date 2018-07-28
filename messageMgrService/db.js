const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true })

const Message = mongoose.model('Message', {
  appId: { type: String, required: true },
  format: { type: String, required: true },
  ToUserName: { type: String, required: true },
  FromUserName: { type: String, required: true },
  CreateTime: { type: String, required: true },
  MsgType: { type: String, required: true },
  MsgId: { type: String, unique: true, unique: true },
  Content: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

const find = (conditions) => {
  return Message.find(conditions).exec()
}

const findOne = (conditions) => {
  return Message.findOne(conditions).exec()
}

const save = (data) => {
  const doc = new Message(data)
  return doc.save()
}

module.exports = { find, findOne, save }
