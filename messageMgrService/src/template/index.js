const text = ({ toUser, fromUser, createTime, content }) => {
  return `
  <xml>
    <ToUserName><![CDATA[${toUser}]]></ToUserName>
    <FromUserName><![CDATA[${fromUser}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${content}]]></Content> 
  </xml>
  `
}

const image = ({ toUser, fromUser, createTime, mediaId }) => {
  return `
  <xml>
    <ToUserName><![CDATA[${toUser}]]></ToUserName>
    <FromUserName><![CDATA[${fromUser}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[image]]></MsgType>
    <Image><MediaId><![CDATA[${mediaId}]]></MediaId></Image>
  </xml>
  `
}

const voice = ({ toUser, fromUser, createTime, mediaId }) => {
  return `
  <xml>
    <ToUserName><![CDATA[${toUser}]]></ToUserName>
    <FromUserName><![CDATA[${fromUser}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[voice]]></MsgType>
    <Voice><MediaId><![CDATA[${mediaId}]]></MediaId></Voice>
  </xml>
  `
}

// TODO: fuck the Error in reply, why?
const video = ({ toUser, fromUser, createTime, mediaId, title, description }) => {
  return `
  <xml>
    <ToUserName><![CDATA[${toUser}]]></ToUserName>
    <FromUserName><![CDATA[${fromUser}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[video]]></MsgType>
    <Video>
      <MediaId><![CDATA[${mediaId}]]></MediaId>
      <Title><![CDATA[${title}]]></Title>
      <Description><![CDATA[${description}]]></Description>
    </Video>
  </xml>
  `
}

const music = ({ toUser, fromUser, createTime, title, description, musicUrl, hqMusicUrl, thumbMediaId }) => {
  return `
  <xml>
    <ToUserName><![CDATA[${toUser}]]></ToUserName>
    <FromUserName><![CDATA[${fromUser}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[music]]></MsgType>
    <Music>
      <Title><![CDATA[${title}]]></Title>
      <Description><![CDATA[${description}]]></Description>
      <MusicUrl><![CDATA[${musicUrl}]]></MusicUrl>
      <HQMusicUrl><![CDATA[${hqMusicUrl}]]></HQMusicUrl>
      <ThumbMediaId><![CDATA[${thumbMediaId}]]></ThumbMediaId>
    </Music>
  </xml>
  `
}

const createItem = ({ title, description, picurl, url}) => {
  return `
  <item>
    <Title><![CDATA[${title}]]></Title>
    <Description><![CDATA[${description}]]></Description>
    <PicUrl><![CDATA[${picurl}]]></PicUrl>
    <Url><![CDATA[${url}]]></Url>
  </item>
  `
}

const createItems = (items) => {
  let itemsTmpl = '';
  items.forEach(item => {
    itemsTmpl += createItem(item)
  })

  return `
  <ArticleCount>${items.length}</ArticleCount>
  <Articles>
    ${itemsTmpl}
  </Articles>
  `
}

const news = ({ toUser, fromUser, createTime, items }) => {
  return `
  <xml>
    <ToUserName><![CDATA[${toUser}]]></ToUserName>
    <FromUserName><![CDATA[${fromUser}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[news]]></MsgType>
    ${createItems(items)}
  </xml>  
  `
}

module.exports = { text, image, voice, video, music, news }
