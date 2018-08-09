const axios = require('axios')
const { count, insertMany } = require('../db')
const config = require('../config')
const logger = require('../logger')

const LIMIT = 100;

const sync = async (type, client) => {
  try {
    let localAllCount = await count()
    let run = true

    while (run) {
      await axios.post(`${config.wxURL}/material/batchget_material?access_token=${client.accessToken}`, {
        'type': type,
        'offset': localAllCount,
        'count': LIMIT
      })
        .then(response => response.data)
        .then(({ errcode, errmsg, ...data }) => {
          if (errcode && errmsg) {
            logger.error(`${errocode} &&&& ${errmsg}`)
            return {}
          } else {
            return data
          }
        })
        .then(({ total_count, item_count, item }) => {
          item.forEach(i => {
            return Object.assign(i, { appId: client.appId, type, title: i.content.news_item[0].title })
          });
          return insertMany(item)
            .then(() => item_count)
            .catch(err => {
              logger.error(`${err}`)
              return Promise.reject()
            })
        })
        .then((item_count) => {
          if (item_count < LIMIT) {
            run = false
          }
        })
        .catch((err) => {
          logger.error(err)
          run = false
        })
    }
  } catch (err) {
    logger.error(err.message)
  }
}

module.exports = sync
