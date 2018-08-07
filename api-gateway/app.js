const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const client = require('./middleware/client')
const ipfilter = require('./middleware/ipfilter')
const { auth, wxauth } = require('./middleware/auth')
const { target } = require('./middleware/target')
const { goto } = require('./middleware/proxy')
const { start } = require('./timingTask')

const wxRouter = require('./router/wx')
const userRouter = require('./router/user')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.text({ type: 'text/xml' }))

app.use('/wx/:tag', ipfilter, client, wxauth, wxRouter)
app.use('/client', auth, target('/client'), goto)
app.use('/user', target('/user'), userRouter)

start(app)

module.exports = app
