
const { ReceiveMessage } = require('../data')
const template = require('../template')

module.exports = (data, type) => {
  if (type === 'msg' || type === 'message' || type === 'm') {
    return ReceiveMessage.findOne({})
      .then(response => response.data)
      .then((doc) => {
        template[doc.MsgType]()
      })
  } else if (type === 'news' || type === 'n') {
    return axios.post(`http://localhost:9003/material/fetch/${data.appId}?type=news`, data.client)
  } else {
    return Promise.reject()
  }
}
