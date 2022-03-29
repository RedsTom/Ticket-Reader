import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ticket: {},
  },
  getters: {
    getTicket(state) {
      return state.ticket;
    },
  },
  mutations: {
    setTicket(state, ticket) {
      state.ticket = ticket;
    },
  },
  actions: {
    updateTicket(store, ticket) {
      store.commit('setTicket', ticket);
      localStorage.setItem('ticket', JSON.stringify(ticket));
    },
  },
  modules: {
  },
});
