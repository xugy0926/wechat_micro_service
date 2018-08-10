const mongoose = require('mongoose')

const AutoReply = mongoose.model('AutoReply', {
  appId: { type: String, required: true },
  format: { type: String, required: true },
  content: { type: String, required: true }
})

const find = (conditions) => {
  return AutoReply.find(conditions).exec()
}

const findOne = (conditions) => {
  return AutoReply.findOne(conditions).exec()
}

const save = (data) => {
  const doc = new AutoReply(data)
  return doc.save()
}

module.exports = { find, findOne, save }
