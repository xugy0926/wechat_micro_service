const createError = require('http-errors')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const R = require('ramda')

const logger = require('./logger')
const { save, find, findOne, update } = require('./db')
const { wxapi, wxrequest } = require('./wxPublicApi')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.json())

app.get('/client/accesstoken/sync', async (req, res, next) => {
  try {
    const clients = await find({})
    for (let i = 0; i < clients.length; i++) {
      const { access_token: accessToken, expires_in: expiresIn } = await wxrequest(
        wxapi.getAccessToken,
        { params: wxapi.getAccessToken.params(clients[i].appId, clients[i].secretKey) }
      )

      await update({ appId: clients[i].appId }, { accessToken, expiresIn })
    }
  } catch (err) {
    logger.error(err)
  }
})

app.get('/client/ips/sync', async (req, res, next) => {
  try {
    const clients = await find({})
    let ips = []
    for (let i = 0; i < clients.length; i++) {
      let { ip_list } = await wxrequest(wxapi.getcallbackip, { params: wxapi.getcallbackip.params(clients[i].accessToken) })
        .catch((err) => {
          logger.error(err)
          return Promise.resolve([])
        })

      ips = R.concat(ips, ip_list || [])
    }

    ips = R.uniq(ips)

    res.send({ ips })
  } catch (err) {
    next(err)
  }
})

app.get('/client', (req, res, next) => {
  find({}).then(res.json.bind(res)).catch(next)
})

app.post('/client', (req, res, next) => {
  const client = req.body || {}

  wxrequest(
    wxapi.getAccessToken,
    { params: wxapi.getAccessToken.params(data.appId, data.secretKey) }
  )
    .then(({ access_token: accessToken, expires_in: expiresIn }) => {
      return R.merge(client, { accessToken, expiresIn })
    })
    .then(save)
    .then(res.json.bind(res))
    .catch(next)
})

app.get('/client/:tag', (req, res, next) => {
  const { tag } = req.params
  findOne({ tag })
    .then(res.json.bind(res))
    .catch(next)
})

app.get('/client/accesstoken/:appId', (req, res, next) => {
  const { appId } = req.params
  findOne({ appId })
    .then(({ secretKey, expiresAt, accessToken }) => {
      if (!expiresAt || expiresAt < new Date().getTime()) {
        return wxrequest(
          wxapi.getAccessToken,
          { params: wxapi.getAccessToken.params(appId, secretKey) }
        ).then(({ access_token: accessToken, expires_in: expiresIn }) => ({ accessToken }))
      } else {
        return ({ accessToken })
      }
    })
    .then(res.json.bind(res))
    .catch(next)
})

app.get('/client/menu/:tag', (req, res, next) => {
  const { tag } = req.params

  findOne({ tag }).then(({ accessToken }) => {
    return wxrequest(wxapi.getMenu, { params: wxapi.getMenu.params(accessToken) })
  })
    .then(res.json.bind(res))
    .catch(next)
})

app.post('/client/menu/:tag', (req, res, next) => {
  const { tag } = req.params

  findOne({ tag }).then(({ accessToken }) => {
    return wxrequest(wxapi.createMenu, { data: wxapi.createMenu.data(accessToken) })
  })
    .then(res.json.bind(res))
    .catch(next)
})

app.delete('/client/menu/:tag', (req, res, next) => {
  const { tag } = req.params
  findOne({ tag }).then(({ accessToken }) => {
    return wxrequest(wxapi.deleteMenu, { params: wxapi.deleteMenu.params(accessToken) })
  })
    .then(() => res.send('success'))
    .catch(next)
})

app.get('/client/custommenu/:tag', (req, res, next) => {
  const { tag } = req.params
  findOne({ tag }).then(({ accessToken }) => {
    return wxrequest(wxapi.getCurrentSelfmenuInfo, { params: wxapi.getCurrentSelfmenuInfo.params(accessToken) })
  })
    .then(res.json.bind(res))
    .catch(next)
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  logger.error(err)
  res.status(err.status || 500)
  res.json({ msg: err.toString() })
})

app.listen(9000)
