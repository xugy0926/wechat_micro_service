const { AutoReply } = require('./data')
const { text } = require('./template')

module.exports = function ({ appId, FromUserName, ToUserName }) {
  return AutoReply.findOne({ appId })
    .then(data => {
      if (!data) {
        data = { format: 'text', content: 'I have received.' }
      }

      return data
    })
    .then((data) => {
      switch (data.format) {
        case 'text':
        default:
          return text({
            toUser: FromUserName,
            fromUser: ToUserName,
            createTime: new Date().getTime(),
            content: data.content
          })
      }
    })
}