const axios = require('axios')

const logger = require('./logger')

const tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token'

const get = (appId, secretKey) => {
  return axios.get(tokenUrl, { params: {
      grant_type: 'client_credential',
      appid: appId,
      secret: secretKey
    }
  })
    .then(response => response.data)
    .then(data => {
      logger.info(data)
      if (data && data.errcode) {
        throw data
      } else {
        return data
      }
    })
}

module.exports = { get }
