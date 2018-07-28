const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')

const { checkToken } = require('./middleware/wxtoken')
const { wxtarget, target } = require('./middleware/target')
const { parse } = require('./middleware/parse')
const { goto } = require('./middleware/proxy')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.text({ type: 'text/xml' }))

const wxRouter = express.Router()
wxRouter.get('/:tag', checkToken)
wxRouter.post('/:tag', parse, wxtarget, goto)

const clientRouter = express.Router()
clientRouter.all('*', goto)

app.use('/wx', wxRouter)
app.use('/client', target('/client'), clientRouter)


module.exports = app
