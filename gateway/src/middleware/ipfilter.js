const ipfilter = require('express-ipfilter').IpFilter

module.exports = (req, res, next) => {
  ipfilter(req.app.whiteips, { mode: 'allow', allowedHeaders: ['x-forwarded-for'] })
  next()
}
