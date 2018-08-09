const R = require('ramda')
const commands = require('../commands')
const { text } = require('../template')

const executeCmd = (req, res, next) => {
  const { client, ...data } = req.body

  if (data.MsgType === 'text' && data.FromUserName === client.adminOpenId) {
    const fun = commands[R.trim(data.text.Content)]
    if (fun) {
      fun(client, data.appId)
        .then(response => response.data)
        .then((ret) => {
          res.send(text({
            toUser: data.FromUserName,
            fromUser: data.ToUserName,
            createTime: new Date().getTime(),
            content: ret || 'no data'
          }))
        }).catch(next)
    } else {
      next()
    }
  } else {
    next()
  }
}

module.exports = executeCmd
