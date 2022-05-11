import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ticket: {},
    filter: 'ALL' as 'ALL' | 'TRANSMITTED',
  },
  getters: {
    getTicket(state) {
      return state.ticket;
    },
    showAll(state) {
      return state.filter === 'ALL';
    },
  },
  mutations: {
    setTicket(state, ticket) {
      state.ticket = ticket;
    },
    setFilter(state, filter: 'ALL' | 'TRANSMITTED') {
      state.filter = filter;
    },
  },
  actions: {
    updateTicket(store, ticket) {
      store.commit('setTicket', ticket);
      localStorage.setItem('ticket', JSON.stringify(ticket));
    },
    updateFilter(store, filter: 'ALL' | 'TRANSMITTED') {
      store.commit('setFilter', filter);
    },
  },
  modules: {
  },
});
