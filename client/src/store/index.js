import Vue from 'vue'
import Vuex from 'vuex'

import Auth from '../Warehouse/Auth';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [createPersistedState()],
})