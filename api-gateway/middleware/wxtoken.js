const axios = require('axios')
const crypto = require('crypto')

const serviceConfig = require('../service_config')
const logger = require('../logger')

const checkToken = (req, res) => {
  axios.get(`${serviceConfig['/client']}/client/${req.params.tag}`)
    .then(response => response.data.client )
    .then(({ token }) => {
      if (!token) {
        throw new Error('tag not match token')
      }

      const { signature, timestamp, nonce, echostr } = req.query
      const str = [token, timestamp, nonce].sort().join('')
      const hashCode = crypto.createHash('sha1')
      const secretCode = hashCode.update(str, 'utf8').digest('hex')

      if (secretCode !== signature) {
        throw new Error('check token failed')
      }

      res.send(echostr)
    })
    .catch(err => {
      logger.error(err)
      res.send('mismatch')
    })
}

module.exports = { checkToken }
