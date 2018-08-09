const mongoose = require('mongoose')

const ReceiveMessage = mongoose.model('ReceiveMessage', {
  appId: { type: String },
  format: { type: String },
  MsgType: { type: String },
  MsgId: { type: String, unique: true },
  ToUserName: { type: String },
  FromUserName: { type: String },
  CreateTime: { type: String },
  text: {
    ToUserName: { type: String },
    FromUserName: { type: String  },
    CreateTime: { type: String },
    MsgType: { type: String  },
    Content: { type: String },
    MsgId: { type: String }
  },
  image: {
    ToUserName: { type: String },
    FromUserName: { type: String },
    CreateTime: { type: String },
    MsgType: { type: String  },
    PicUrl: { type: String },
    MediaId: { type: String },
    MsgId: { type: String }
  },
  voice: {
    ToUserName: { type: String },
    FromUserName: { type: String  },
    CreateTime: { type: String },
    MsgType: { type: String  },
    MediaId: { type: String },
    Format: { type: String },
    Recognition: { type: String },
    MsgId: { type: String }
  },
  video: {
    ToUserName: { type: String },
    FromUserName: { type: String  },
    CreateTime: { type: String },
    MsgType: { type: String  },
    MediaId: { type: String },
    ThumbMediaId: { type: String },
    MsgId: { type: String }
  },
  shortvideo: {
    ToUserName: { type: String },
    FromUserName: { type: String  },
    CreateTime: { type: String },
    MsgType: { type: String  },
    MediaId: { type: String },
    ThumbMediaId: { type: String },
    MsgId: { type: String }
  },
  location: {
    ToUserName: { type: String },
    FromUserName: { type: String  },
    CreateTime: { type: String },
    MsgType: { type: String  },
    Location_X: { type: String },
    Location_Y: { type: String },
    Scale: { type: String },
    Lable: { type: String },
    MsgId: { type: String }
  },
  link: {
    ToUserName: { type: String },
    FromUserName: { type: String  },
    CreateTime: { type: String },
    MsgType: { type: String  },
    Title: { type: String },
    Description: { type: String },
    Url: { type: String },
    MsgId: { type: String }
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

const find = (conditions) => {
  return ReceiveMessage.find(conditions).exec()
}

const findOne = (conditions) => {
  return ReceiveMessage.findOne(conditions).exec()
}

const save = (data) => {
  // data.MsgId is unique.
  const doc = new ReceiveMessage(data)
  return doc.save()
}

module.exports = { find, findOne, save }