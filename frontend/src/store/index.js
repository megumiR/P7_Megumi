import router from '@/router';
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
 // Pas besoin?  token: localStorage.getItem('userToken') || '',
    status: null
  },
  getters: {  //  Stateimagefile: state => { return state.imageFile }, 
//    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {  //token,  setImagefile (state, imageFile) { state.imageFile = imageFile }
    AUTH_SUCCESS: (state, { email, roll}) => {
      state.status = 'success'
      state.userId = email 
      state.roll = roll
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    }
   //LOGOUT: (state) => { state.userId = null state.token = null state.status = null}
  },
  actions: { 
 //   logIn: ({ commit }, payload) => {  
    sendSigninform: ({commit}, userInfos) => {
        instance.post('/signup', userInfos)
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem('userToken', token);
            commit('AUTH_SUCCESS', response.data.roll)  //commit -> mutation active
            const email = userInfos.email;
            commit('AUTH_SUCCESS', email)
           // window.location.href = this.$localhost;
            router.push({ path: '/', replace: true})
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
          commit('AUTH_SUCCESS', response.data.roll)
          const email = loginInfos.email;
          commit('AUTH_SUCCESS', email)
          window.location.href = this.$localhost; //not working...
        //  router.push({ path: '/', replace: true}) // this worked
        }).catch((err) => {
          commit('AUTH_ERROR', err)
          localStorage.removeItem('userToken');
        })
    },
    /* logout: ({commit}) => {
      commit('LOGOUT')
      localStorage.removeItem('userToken')
    } */
/* **************OLD ONE***************************************
    fetchAllPosts: (states) => {
      console.log('states: '+ JSON.stringify(states));
      console.log(states.state.token);
    
    //  console.log(localStorage.getItem('userToken'));
    //  let authToken = { 'Authorization': 'Bearer ' + localStorage.getItem('userToken')};
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
         //return this.list = response.data.result /// return data => (this.list = data.result)
        }).catch((err) => {
          throw err;
        })
    }*/

  },
  modules: {
  }

})

