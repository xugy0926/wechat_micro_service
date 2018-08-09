const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true })

const Client = mongoose.model('Client', {
  name: { type: String, required: true, unique: true },
  tag: { type: String, required: true, unique: true },
  appId: { type: String, required: true, unique: true },
  secretKey: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  accessToken: { type: String },
  adminOpenId: { type: String, required: true },
  expiresIn: { type: Number, default: 0 },
  expiresAt: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now},
  updateAt: { type: Date, default: Date.now}
})

const find = (conditions) => {
  return Client.find(conditions).exec()
}

const findOne = (conditions) => {
  return Client.findOne(conditions).exec()
}

const save = (data) => {
  const doc = new Client(data)
  return doc.save()
}

const update = (conditions, { accessToken, expiresIn }) => {
  if (!accessToken || !expiresIn) {
    return Promise.reject(new Error('参数错误'))
  }

  const expiresAt = new Date().getTime() + expiresIn * 1000
  const updateAt = new Date()
  return Client.updateOne(conditions, {accessToken, expiresIn, expiresAt, updateAt}).exec()
}

module.exports = { find, findOne, save, update }
