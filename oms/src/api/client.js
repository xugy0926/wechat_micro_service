import axios from 'axios'

export default {
  getClients() {
    axios.get('http://localhost:3000/client').then(response => response.data)
  },

  addClient(client) {
    axios.post('http://localhost:3000/client', {
      client
    }).then(response => response.data)
  }
}
