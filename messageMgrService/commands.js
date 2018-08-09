const axios = require('axios')

const commands = {
  'fetch news': (client, appId) => {
    return axios.post(`http://localhost:9003/material/fetch/${appId}?type=news`, client)
  },
  'sync': (client, appId) => {
    return axios.post(`http://localhost:9003/material/sync/${appId}`, client)
  }  
}

module.exports = commands
