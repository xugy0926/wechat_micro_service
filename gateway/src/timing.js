const Rx = require('rx')
const axios = require('axios')
const log = require('log4js').getLogger('gateway:timing')

const serviceURL = require('./serviceURL')

const interval = Rx.Observable.interval
const timer = Rx.Observable.timer

const updateAccessToken = async () => {
  try {
    await axios.get(`${serviceURL['/client']}/client/accesstoken/sync`)
  } catch (err) {
    log.error(`[updateAccessToken] ${err.message}`)
  }
}

timer(2).subscribe(() => {
  interval(100000).subscribe(updateAccessToken)
})
