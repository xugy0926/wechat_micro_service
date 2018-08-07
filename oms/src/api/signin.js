import axios from 'axios'

export default function (name, password) {
  return axios.post('http://localhost:3000/user/signin', {
    name, password
  }).then(response => response.data)
}
