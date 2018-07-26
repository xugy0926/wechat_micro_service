const Rx = require('rx')

const logger = require('./logger')
const config = require('./config')
const { get } = require('./token')
const { find, update } = require('./db')

const interval = Rx.Observable.interval
const timer = Rx.Observable.timer

const refresh = async () => {
  try {
    const docs = await find({})
    for (let i = 0; i < docs.length; i++) {
      const { access_token, expires_in } = await get(docs[i].appId, docs[i].secretKey)
      await update({appId: docs[i].appId}, { accessToken: access_token, expiresIn: expires_in})
    }
  } catch (err) {
    logger.error(err)
  }
}

const refreshOne = async (appId, secretKey) => {
  try {
    const { access_token, expires_in } = await get(appId, secretKey)
    await update({appId}, { accessToken: access_token, expiresIn: expires_in})
  } catch (err) {
    logger.error(err)
  }
}

const start = () => {
  timer(2).subscribe(() => {
    refresh()
    interval(config.updateCycle).subscribe(refresh)
  })
}

const checkExpire = (appId, secretKey, expiresAt) => {
  if (!expiresAt || expiresAt < new Date().getTime()) {
    timer(0).subscribe(() => {
      refreshOne(appId, secretKey)
    })
  } 
}

module.exports = { start, checkExpire }