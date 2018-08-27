import axios from 'axios'
import Vue from 'vue'

const SERVER_URL = process.env.SERVER_URL

export default {
  getClients() {
    axios.defaults.headers.common['x-access-token'] = Vue.cookie.get('token')
    return axios.get(`${SERVER_URL}/client`).then(response => response.data)
  },

  addClient(client) {
    axios.defaults.headers.common['x-access-token'] = Vue.cookie.get('token')
    return axios.post(`${SERVER_URL}/client`, client).then(response => response.data)
  }
}
