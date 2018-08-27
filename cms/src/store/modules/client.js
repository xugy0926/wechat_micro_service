import clientAPI from '../../api/client'

// initial state
const state = {
  clients: []
}

// getters
const getters = {
  clients: () => state.clients
}

// actions
const actions = {
  async getClients({ commit }) {
    try {
      const clients = await clientAPI.getClients()
      commit('setClients', clients)
    } catch (err) {
      console.error(err)
    }
  },
  async addClient({ commit }, client) {
    const data = await clientAPI.addClient(client)
    commit('addClient', data.client)
  }
}

// mutations
const mutations = {
  setClients(state, clients) {
    state.clients = clients
  },
  addClient(state, client) {
    state.clients.push(client)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
