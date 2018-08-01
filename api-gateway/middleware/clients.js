const axios = require('axios')
const serviceConfig = require('../service_config')

const clients = (req, res, next) => {
  axios.get(`${serviceConfig['/client']}/client`)
    .then(response => response.data)
    .then(({ clients }) => {
      req.app.clients = clients
      next()
    })
    .catch(next)
}

module.exports = clients
