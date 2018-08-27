module.exports = (client, appId) => {
  return axios.post(`http://localhost:9003/material/sync/${appId}`, client)
}  