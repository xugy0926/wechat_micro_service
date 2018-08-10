const {
  text,
  image,
  voice,
  video,
  music,
  news } = require('./index')

const randomReply = (data) => {
  let replyList = []

  replyList.push(text({
    toUser: data.FromUserName,
    fromUser: data.ToUserName,
    createTime: new Date().getTime(),
    content: 'my friend, how are u! I am fine!'
  }))

  replyList.push(image({
    toUser: data.FromUserName,
    fromUser: data.ToUserName,
    createTime: new Date().getTime(),
    mediaId: 'nbb3MyrimlVTyytWfnCA_eTAFbLghypZx2K_pDZUwRMMcGuhas2oUJ_-9W5r_f-6'
  }))

  replyList.push(voice({
    toUser: data.FromUserName,
    fromUser: data.ToUserName,
    createTime: new Date().getTime(),
    mediaId: 'x1Or3sO0ugUP2ETkEURSmSceSWeoAVETLyxunQbP1ybdNiN7PHw835UcnCS3TnX5'
  }))

  replyList.push(video({
    toUser: data.FromUserName,
    fromUser: data.ToUserName,
    createTime: new Date().getTime(),
    mediaId: 'Er5AavYb2gxbbyWrsANMPkjMFs9mIHkxpaKGO8WWrks8yTe71ookDHarbE2ptiAQ',
    title: 'hi',
    description: 'iamxugaoyang'
  }))

  replyList.push(music({
    toUser: data.FromUserName,
    fromUser: data.ToUserName,
    createTime: new Date().getTime(),
    title: 'a music',
    description: 'this is a music',
    musicUrl: '  http://url.cn/5SXRwLl',
    hqMusicUrl: '  http://url.cn/5SXRwLl',
    thumbMediaId: 'nbb3MyrimlVTyytWfnCA_eTAFbLghypZx2K_pDZUwRMMcGuhas2oUJ_-9W5r_f-6'
  }))

  replyList.push(news({
    toUser: data.FromUserName,
    fromUser: data.ToUserName,
    createTime: new Date().getTime(),
    items: [
      {
        title: 'title1',
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
