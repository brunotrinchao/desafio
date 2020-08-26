import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const vue = new Vue();

export default new Vuex.Store({
  state: {
    conta: null
  },
  mutations: {
    SET_CONTA(state, conta) {
      state.conta = conta;
    }
  },
  actions: {
    // Contas
    async getTodasContas() {
      let response = await vue.$api.get('/conta', {});
      return response.data;
    },
    async getConta(_, id) {
      let retorno = await vue.$api.get(`/conta/${id}`, {});

      return retorno.data.data;
    },
    setConta({ commit }, data) {
      commit('SET_CONTA', data);
    },
    async postConta(_, params) {
      let retorno = null;

      try {
        let ret = await vue.$api.post('/conta', { user_id: 1, ...params });
        retorno = ret.data;
      } catch (erro) {
        retorno = erro.response.data;
      }

      return retorno;
    },
    // transacoes
    async getExtrato({ state }, param) {
      let response = null;
      if(state.conta.id){
      let account_id = state.conta.id;
      response = await vue.$api.get('/transacao', { params: { ...param, account_id } });
      }
      return response.data;
    },
    async setExtrato(_, param) {
      let response = await vue.$api.post('/transacao', param);
      return response.data;
    }
  },
  getters: {
    conta(state) {
      return state.conta;
    }
  }
});
