const axios = require('axios')
const R = require('ramda')

const HOST = 'https://api.weixin.qq.com/cgi-bin'

const handleError = ({ errcode, errmsg, ...data }) => {
  if (errcode && errmsg) {
    throw new Error(errcode + ' &&&& ' + errmsg)
  }

  return data
}

const wxapi = {
  getMaterialList: {
    method: 'post',
    url: HOST + '/material/batchget_material',
    params: access_token => ({ access_token }),
    data: ({ type, offset, count }) => ({ type, offset, count }),
    handleError
  }
}

const wxrequest = (config, options) => {
  if (params) config = R.merge(config, { params })
  if (data) config = R.merge(config, { data })

  return axios(config)
    .then(response => response.data)
    .then(config.handleError)
}

module.exports = { wxapi, wxrequest }
