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
  getAccessToken: {
    method: 'get',
    url: HOST + '/token',
    params: (appid, secret) => ({ appid, secret, grant_type: 'client_credential' }),
    handleError
  },
  getcallbackip: {
    method: 'get',
    url: HOST + '/getcallbackip',
    params: (access_token) => ({ access_token }),
    handleError
  },
  getMenu: {
    method: 'get',
    url: HOST + '/menu/get',
    params: (access_token) => ({ access_token }),
    handleError
  },
  createMenu: {
    method: 'post',
    url: HOST + '/menu/create',
    data: data => data,
    handleError
  },
  deleteMenu: {
    method: 'get',
    url: HOST + '/menu/delete',
    params: (access_token) => ({ access_token }),
    handleError
  },
  getCurrentSelfmenuInfo: {
    mtehod: 'get',
    url: HOST + '/get_current_selfmenu_info',
    params: (access_token) => ({ access_token }),
    handleError
  }
}

const wxrequest = (config, { params, data }) => {
  if (params) config = R.merge(config, { params })
  if (data) config = R.merge(config, { data })

  return axios(config)
    .then(response => response.data)
    .then(config.handleError)
}

module.exports = { wxapi, wxrequest }
