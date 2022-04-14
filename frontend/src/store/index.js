import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    roll: null,   
    imageFile: null,
    token: localStorage.getItem('userToken') || '',
    status: ''
  },
  getters: {  //  Stateimagefile: state => { return state.imageFile }, 
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {  //  setImagefile (state, imageFile) { state.imageFile = imageFile }
    AUTH_SUCCESS: (state, {token, email}) => {
      state.status = 'success'
      state.userId = email 
      state.token = token
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    },
   //LOGOUT: (state) => { state.userId = null state.token = null state.status = null}
  },
  actions: { 
 //   logIn: ({ commit }, payload) => {  
    sendSigninform: ({commit}, userInfos) => {
        instance.post('/signup', userInfos)
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem('userToken', token);
            commit('AUTH_SUCCESS', token) //commit -> mutation active
            const email = userInfos.email;
            commit('AUTH_SUCCESS', email)
            window.location.href = 'http://localhost:8080/';
          })
          .catch((err) => {
            commit('AUTH_ERROR', err)
            localStorage.removeItem('userToken');
          })
    },
    sendLoginform: ({ commit }, loginInfos) => {
      console.log(loginInfos);
      instance.post('/login', loginInfos)
        .then((response) => {
          console.log(response);
          const token = response.data.token;
          localStorage.setItem('userToken', token);
          commit('AUTH_SUCCESS', token)
          const email = loginInfos.email;
          commit('AUTH_SUCCESS', email)
          window.location.href = 'http://localhost:8080/';
          
        }).catch((err) => {
          commit('AUTH_ERROR', err)
          localStorage.removeItem('userToken');
        })
    },
    /* logout: ({commit}) => {
      commit('LOGOUT')
      localStorage.removeItem('userToken')
    } */
    fetchAllPosts: (states) => {
      console.log('states: '+ JSON.stringify(states));
      console.log(states.state.token);
      
      let authToken = { 'Authorization': 'Bearer ' + states.state.token};
      console.log(authToken);
      let requestHeaders = {
        headers: authToken
      }
      instance.get('/posts', requestHeaders)
        .then((response) => {
          console.log(response);
          console.log(response.data.result);
          let list = response.data.result;
          return list;
         // return data => (this.list = data.result)
          
        }).catch((err) => {
          throw err;
          //response.status(400).json({ err });
        })

    }
  },
  modules: {
  }

})

