const createItem = ({ title, description, picurl, url }) => {
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

module.exports = {
  'text': ({ ToUserName, FromUserName, CreateTime, Content }) => {
    return `
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
        <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
        <CreateTime>${CreateTime}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${Content}]]></Content> 
      </xml>
      `
  },
  'image': ({ ToUserName, FromUserName, CreateTime, MediaId }) => {
    return `
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
        <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
        <CreateTime>${CreateTime}</CreateTime>
        <MsgType><![CDATA[image]]></MsgType>
        <Image><MediaId><![CDATA[${MediaId}]]></MediaId></Image>
      </xml>
      `
  },
  'voice': ({ ToUserName, FromUserName, CreateTime, MediaId }) => {
    return `
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
        <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
        <CreateTime>${CreateTime}</CreateTime>
        <MsgType><![CDATA[voice]]></MsgType>
        <Voice><MediaId><![CDATA[${MediaId}]]></MediaId></Voice>
      </xml>
      `
  },

  // TODO: fuck the Error in reply, why?
  'video': ({ ToUserName, FromUserName, CreateTime, MediaId, title, description }) => {
    return `
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
        <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
        <CreateTime>${CreateTime}</CreateTime>
        <MsgType><![CDATA[video]]></MsgType>
        <Video>
          <MediaId><![CDATA[${MediaId}]]></MediaId>
          <Title><![CDATA[${title}]]></Title>
          <Description><![CDATA[${description}]]></Description>
        </Video>
      </xml>
      `
  },
  'music': ({ ToUserName, FromUserName, CreateTime, title, description, musicUrl, hqMusicUrl, thumbMediaId }) => {
    return `
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
        <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
        <CreateTime>${CreateTime}</CreateTime>
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
  },
  'news': ({ ToUserName, FromUserName, CreateTime, items }) => {
    return `
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
        <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
        <CreateTime>${CreateTime}</CreateTime>
        <MsgType><![CDATA[news]]></MsgType>
        ${createItems(items)}
      </xml>  
      `
  }
}
