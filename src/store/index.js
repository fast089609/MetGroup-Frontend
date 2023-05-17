import Cookies from 'js-cookie';
import { createStore } from 'vuex'

export default createStore({
  state: {
    authToken: null
  },
  getters: {
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.authToken = token;
    },
    CLEAR_TOKEN(state) {
      state.authToken = null;
    }
  },
  actions: {
    login({ commit }, token) {
      // Guardar el token en la cookie segura
      Cookies.set('authToken', token, { secure: true, sameSite: 'strict' });

      // Establecer el token en Vuex
      commit('SET_TOKEN', token);
    },
    logout({ commit }) {
      // Eliminar el token de la cookie
      Cookies.remove('authToken');

      // Limpiar el token en Vuex
      commit('CLEAR_TOKEN');
    }
  },
  modules: {
  }
})
