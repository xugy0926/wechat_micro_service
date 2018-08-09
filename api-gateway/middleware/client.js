const axios = require('axios')
const serviceConfig = require('../service_config')

const client = (req, res, next) => {
  axios.get(`${serviceConfig['/client']}/client/${req.params.tag}`)
    .then(response => response.data)
    .then((client) => {
      req.client = client
      next()
    })
    .catch(next)
}

module.exports = client
