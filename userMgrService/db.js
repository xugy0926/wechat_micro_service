const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true })

const User = mongoose.model('User', {
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

const find = (conditions) => {
  return User.find(conditions).exec()
}

const findOne = (conditions) => {
  return User.findOne(conditions).exec()
}

const save = (data) => {
  const doc = new User(data)
  return doc.save()
}

module.exports = { find, findOne, save }
