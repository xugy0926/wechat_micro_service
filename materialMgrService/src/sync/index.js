const R = require('ramda')
const { count, insertMany } = require('../db')
const logger = require('../logger')

const { wxapi, wxrequest } = require('../wxPublicApi')

const LIMIT = 100;

const sync = async (type, client) => {
  try {
    let localAllCount = await count()
    let run = true

    console.error(localAllCount);
    while (run) {
      await wxrequest(wxapi.getMaterialList, {
            params: wxapi.getMaterialList.params(client.accessToken),
            data: wxapi.getMaterialList.data({
              type: type,
              offset: localAllCount,
              count: LIMIT
            })
          })
        .then(({ total_count, item_count, item }) => {
          item && item.forEach(i => {
            return Object.assign(i, { appId: client.appId, type, title: i.content.news_item[0].title })
          });

          return insertMany(item || [])
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
    }
  } catch (err) {
    logger.error(err)
  }
}

module.exports = sync
