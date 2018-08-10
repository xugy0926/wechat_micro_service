const crypto = require('crypto')
const jwt = require('jwt-simple')
const R = require('ramda')

const config = require('../config')

const auth = (req, res, next) => {
  const token = req.headers[config.tokenTag] || ''

  if (!token) {
    res.status(401).json({ msg: 'Access token not found' })
    return
  }

  try {
    const decoded = jwt.decode(token, config.secretKey)

    if (!decoded._id || !decoded.name || !decoded.exp) {
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

const wxauth = (req, res, next) => {
  const { token = '' } = req.client
  const { signature, timestamp, nonce, echostr } = req.query
  const str = [token, timestamp, nonce].sort().join('')
  const hashCode = crypto.createHash('sha1')
  const secretCode = hashCode.update(str, 'utf8').digest('hex')

  if (secretCode === signature) {
    req.wxauth = { code: 1, result: echostr }
    next()
  } else {
    res.send('mismatch')
  }
}

module.exports = { auth, wxauth}
