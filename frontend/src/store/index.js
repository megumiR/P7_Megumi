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
    userName: null,
    roll: null,   
   // imageFile: null,
    status: null,
    mode: null
  },
  getters: {  //  Stateimagefile: state => { return state.imageFile }, 
    authStatus: state => state.status,
    rollAdmin: state => state.roll
  },
  mutations: {  //  setImagefile (state, imageFile) { state.imageFile = imageFile }
    AUTH_SUCCESS_USERID: (state,  userId) => {
      state.userId = userId
    },
    AUTH_SUCCESS_USERNAME: (state,  userName) => {
      state.userName = userName 
    },
    AUTH_SUCCESS_ROLL: (state,  roll) => {
      state.roll = roll 
    },
    AUTH_SUCCESS: (state) => {
      state.status = 'success'
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    },
    MODE_UPDATE: (state) => {
      state.mode = 'update'
    }
             //LOGOUT: (state) => { state.userId = null state.roll = null state.status = null}
  //  IMG_INSERETED: (state, {imageFile}) => {
  //    state.imageFile = imageFile
  //  }
  },
  actions: { 
 //   logIn: ({ commit }, payload) => {  
    sendSigninform: ({commit}, userInfos) => {
        instance.post('/signup', userInfos)
// this.$axios.post(this.$requestBaseURL + 'signup', userInfos)
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem('userToken', token);
            localStorage.setItem('userID', response.data.userId);
            commit('AUTH_SUCCESS')  //commit -> mutation active
            commit('AUTH_SUCCESS_USERID', response.data.userId)
            commit('AUTH_SUCCESS_USERNAME', response.data.userName)
            commit('AUTH_SUCCESS_ROLL', response.data.roll)  

            
            console.log(this.state.userId);
           // window.location.href = this.$localhost;
            router.push({ path: '/', replace: true})
          })
          .catch((err) => {
            commit('AUTH_ERROR', err)
            localStorage.removeItem('userToken');
            localStorage.removeItem('userID');
          })
    },
    sendLoginform: ({ commit }, loginInfos) => {
      console.log('loginInfos');
      console.log(loginInfos);
      instance.post('/login', loginInfos)
// this.$axios.post(this.$requestBaseURL + 'login', loginInfos) //global var undefined
        .then((response) => {
          console.log(response);
          const token = response.data.token;
          localStorage.setItem('userToken', token);
          localStorage.setItem('userID', response.data.userId);
          commit('AUTH_SUCCESS')
          commit('AUTH_SUCCESS_USERID', response.data.userId)
          commit('AUTH_SUCCESS_USERNAME', response.data.userName)
          commit('AUTH_SUCCESS_ROLL', response.data.roll) 
          
        //  window.location.href = this.$localhost; //not working...
          router.push({ path: '/', replace: true}) // this worked but not ->? this.$router.push('/')
        }).catch((err) => {
          commit('AUTH_ERROR', err)
          localStorage.removeItem('userToken');
          localStorage.removeItem('userID');
        })
    },
    /* logout: ({commit}) => {
      commit('LOGOUT')
      localStorage.removeItem('userToken');
      localStorage.removeItem('userID');
    } */
/* **************OLD ONE***************************************
********CHECK async await and search()  https://stackoverflow.com/questions/62265815/returning-data-from-store-js-in-vuejs-returns-typeerror
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

   /*   document.getElementById('titleBeforeUpdate').textContent = `Ancien title: ${post.title}` ;


  */
  },
  modules: {
  }

})

