import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const vue = new Vue();

export default new Vuex.Store({
  state: {
    conta: {
      id: null
    }
  },
  mutations: {
    SET_CONTA(state, id) {
      state.conta = id;
    }
  },
  actions: {
    async getTodasContas() {
      let response = await vue.$api.get('/conta', {});
      return response.data;
    },
    async getConta({ commit }, params) {
      let retorno = await vue.$api.get('/conta', { params });

      commit('SET_CONTA', retorno.data);

      return retorno;
    }
  },
  getters: {
    conta(state) {
      return state.conta;
    }
  }
});
