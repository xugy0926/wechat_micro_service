const { text, image, voice, video, music, news } = require('./index')

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
    mediaId: 'bk2EFdxmhuzmbbxuEzCTcMxXInOJAl-zOTclDGFFDbF9EhiuJ7Sv-aMTU_r_otSE'
  }))

  replyList.push(voice({
    toUser: data.FromUserName,
    fromUser: data.ToUserName,
    createTime: new Date().getTime(),
    mediaId: 'ft-kI3nAJZ-X6Pp1VS6f2V8HporVpqDVlgWzdJylYZiwh_6KxNUFQlvXUfPlgWXr'
  }))

  replyList.push(video({
    toUser: data.FromUserName,
    fromUser: data.ToUserName,
    createTime: new Date().getTime(),
    mediaId: '_1TnyQ4-FESiAZFwzy-YLnwLjSFvSkV2dDyvtgcbxaiUAtt-e5GMwCwgSJmp4Wn8',
    title: 'hi',
    description: 'iamxugaoyang'
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
