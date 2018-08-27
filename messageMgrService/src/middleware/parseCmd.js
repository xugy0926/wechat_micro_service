const R = require('ramda')
const cmds = require('../cmds')
const template = require('../template')

module.exports = (req, res, next) => {
  const data = req.body

  if (data.MsgType === 'text' && data.FromUserName === client.adminOpenId) {
    const fun = cmds[R.trim(data.text.Content || '')]
    if (fun) {
      fun(data, args[1])
        .then(response => response.data)
        .then((ret) => {
          res.send(template['text']({
            toUser: data.FromUserName,
            fromUser: data.ToUserName,
            createTime: new Date().getTime(),
            content: ret || '指令已执行'
          }))
        }).catch(next)
    } else {
      next()
    }
  } else {
    next()
  }
}
