import clientAPI from '../../api/client'

// initial state
const state = {
  clients: []
}

// getters
const getters = {}

// actions
const actions = {
  async getClients({ commit }) {
    try {
      const clients = await clientAPI.getClients()
      commit('setClients', clients)
    } catch (err) {
      console.error(err)
    }
  }
}

// mutations
const mutations = {
  setClients(state, clients) {
    state.clients = clients
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
