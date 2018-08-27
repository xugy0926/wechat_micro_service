const template = require('./index')

const randomReply = (data) => {
  let replyList = []

  replyList.push(template['text']({
    ToUserName: data.FromUserName,
    FromUserName: data.ToUserName,
    CreateTime: new Date().getTime(),
    Content: 'my friend, how are u! I am fine!'
  }))

  replyList.push(template['image']({
    ToUserName: data.FromUserName,
    FromUserName: data.ToUserName,
    CreateTime: new Date().getTime(),
    MediaId: 'nbb3MyrimlVTyytWfnCA_eTAFbLghypZx2K_pDZUwRMMcGuhas2oUJ_-9W5r_f-6'
  }))

  replyList.push(template['voice']({
    ToUserName: data.FromUserName,
    FromUserName: data.ToUserName,
    CreateTime: new Date().getTime(),
    MediaId: 'x1Or3sO0ugUP2ETkEURSmSceSWeoAVETLyxunQbP1ybdNiN7PHw835UcnCS3TnX5'
  }))

  replyList.push(template['video']({
    ToUserName: data.FromUserName,
    FromUserName: data.ToUserName,
    CreateTime: new Date().getTime(),
    MediaId: 'Er5AavYb2gxbbyWrsANMPkjMFs9mIHkxpaKGO8WWrks8yTe71ookDHarbE2ptiAQ',
    title: 'hi',
    description: 'iamxugaoyang'
  }))

  replyList.push(template['music']({
    ToUserName: data.FromUserName,
    FromUserName: data.ToUserName,
    CreateTime: new Date().getTime(),
    title: 'a music',
    description: 'this is a music',
    musicUrl: '  http://url.cn/5SXRwLl',
    hqMusicUrl: '  http://url.cn/5SXRwLl',
    thumbMediaId: 'nbb3MyrimlVTyytWfnCA_eTAFbLghypZx2K_pDZUwRMMcGuhas2oUJ_-9W5r_f-6'
  }))

  replyList.push(template['news']({
    ToUserName: data.FromUserName,
    FromUserName: data.ToUserName,
    CreateTime: new Date().getTime(),
    items: [
      {
        itle: 'title1',
        description: 'description1',
        picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/gdia7LYLCz12aiaibEUD1EmmzqMIrJEVBanIr5RP7kNONfEbrJSBfEHXtOWufHEIdEwuleUibziallCncIWibeDkTaibg/0',
        url: 'http://baidu.com'
      },
      {
        title: 'title2',
        description: 'description2',
        picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/gdia7LYLCz12aiaibEUD1EmmzqMIrJEVBanIr5RP7kNONfEbrJSBfEHXtOWufHEIdEwuleUibziallCncIWibeDkTaibg/0',
        url: 'http://baidu.com'
      },
      {
        title: 'title3',
        description: 'description3',
        picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/gdia7LYLCz12aiaibEUD1EmmzqMIrJEVBanIr5RP7kNONfEbrJSBfEHXtOWufHEIdEwuleUibziallCncIWibeDkTaibg/0',
        url: 'http://baidu.com'
      }
    ]
  }))

  return replyList[Math.floor(Math.random() * replyList.length)]
}

module.exports = randomReply
