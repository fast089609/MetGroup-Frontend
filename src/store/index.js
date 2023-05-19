import Cookies from 'js-cookie';
import { createStore } from 'vuex'

export default createStore({
  state: {
    authToken: null,
    sideBarOpen: false
  },
  getters: {
    sideBarOpen: state => {
        return state.sideBarOpen
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.authToken = token;
    },
    CLEAR_TOKEN(state) {
      state.authToken = null;
    },
    toggleSidebar (state) {
        state.sideBarOpen = !state.sideBarOpen
    }
  },
  actions: {
    login({ commit }, token) {
      // Guardar el token en la cookie segura
      console.log(token);
      Cookies.set('authToken', token, { secure: true, sameSite: 'strict' });

      // Establecer el token en Vuex
      commit('SET_TOKEN', token);
    },
    logout({ commit }) {
      // Eliminar el token de la cookie
      Cookies.remove('authToken');

      // Limpiar el token en Vuex
      commit('CLEAR_TOKEN');
    },
    toggleSidebar(context) {
        context.commit('toggleSidebar')
    }
  },
  modules: {
  }
})
