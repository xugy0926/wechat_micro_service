const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const ipfilter = require('express-ipfilter').IpFilter

const client = require('./middleware/client')
const { wxauth } = require('./middleware/auth')
const { wxtarget, target } = require('./middleware/target')
const { parse } = require('./middleware/parse')
const { goto } = require('./middleware/proxy')
const { start } = require('./timingTask')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.text({ type: 'text/xml' }))

const wxRouter = express.Router()
wxRouter.get('/:tag', client, wxauth, (req, res) => {
  res.send(req.wxauth.result)
})
wxRouter.post('/:tag', /*ipfilter(app.whiteips, {mode: 'allow'}),*/ client, wxauth, parse, wxtarget, goto)

const clientRouter = express.Router()
clientRouter.all('*', goto)

app.use('/wx', wxRouter)
app.use('/client', target('/client'), clientRouter)

start(app)

module.exports = app
