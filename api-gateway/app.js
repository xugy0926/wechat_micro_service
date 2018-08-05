const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const ipfilter = require('express-ipfilter').IpFilter

const client = require('./middleware/client')
const { auth, wxauth } = require('./middleware/auth')
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

const userRouter = express.Router()
userRouter.post('/signup', goto)
userRouter.post('/signin', goto)

app.use('/wx', wxRouter)
app.use('/client', auth, target('/client'), clientRouter)
app.use('/user', target('/user'), userRouter)

start(app)

module.exports = app
