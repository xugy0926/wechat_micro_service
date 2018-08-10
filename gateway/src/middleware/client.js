const axios = require('axios')
const serviceURL = require('../serviceURL')

const client = (req, res, next) => {
  axios.get(`${serviceURL['/client']}/client/${req.params.tag}`)
    .then(response => response.data)
    .then((client) => {
      req.client = client
      next()
    })
    .catch(next)
}

module.exports = client
