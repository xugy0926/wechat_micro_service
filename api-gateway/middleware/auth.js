const jwt = require('jwt-simple')

const config = require('../config')

const auth = function (req, res, next) {
  const token = req.headers[config.tokenTag] || ''

  if (!token) {
    res.status(401).json({ msg: 'Access token not found' })
    return
  }

  try {
    const decoded = jwt.decode(token, config.secretKey)

    if (!decoded.user_id || !decoded.user_name || !decoded.exp) {
      res.status(401).json({ msg: 'Access token illegal' })
      return
    }

    if (decoded.exp <= Date.now()) {
      res.status(401).json({ msg: 'Access token has expired' })
      return
    }

    next()
  } catch (err) {
    res.status(401).json({ msg: 'Access token failed' })
  }
}

module.exports = auth
