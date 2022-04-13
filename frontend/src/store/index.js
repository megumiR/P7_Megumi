import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
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
      state.user = email 
      state.token = token
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    },
   
  },
  actions: { //https://openclassrooms.com/en/courses/6390311-creez-une-application-web-avec-vue-js/6870776-modifiez-vos-donnees-dans-vuex
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
    fetchAllPosts: ({ commit }) => {
      
      instance.get('/posts', this.token)
        .then((response) => {
          console.log(response);
          data => (this.list = data.result)
          commit()
        })
    }
  },
  modules: {
  }
})

/*
login: function() {
  this.$store.dispatch('login', {
    utilisateur: this.utilisateur,
    email: this.email,
    password: this.password
  })
  .then( function (res) {
    console.log(res);
  }).catch( err => {
    throw err;
  })*/