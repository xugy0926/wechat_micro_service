const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true })

const Material = mongoose.model('Material', {
  appId: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String },
  media_id: { type: String, required: true },
  update_time: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

const count = () => {
  return Material.countDocuments({}).exec()
}

const find = (conditions) => {
  return Material.find(conditions).exec()
}

const findOne = (conditions) => {
  return Material.findOne(conditions).exec()
}

const save = (data) => {
  const doc = new Material(data)
  return doc.save()
}

const insertMany = (items) => {
  return Material.insertMany(items)
}

module.exports = { count, find, findOne, save, insertMany }
