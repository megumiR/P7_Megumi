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
    userId: 'toto',
    roll: null,   
    imageFile: null,
    status: null
  },
  getters: {  //  Stateimagefile: state => { return state.imageFile }, 
    authStatus: state => state.status
  },
  mutations: {  //  setImagefile (state, imageFile) { state.imageFile = imageFile }
    AUTH_SUCCESS_USERID: (state,  userId) => {
      state.userId = userId 
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
   //LOGOUT: (state) => { state.userId = null state.token = null state.status = null}
    IMG_INSERETED: (state, {imageFile}) => {
      state.imageFile = imageFile
    }
  },
  actions: { 
 //   logIn: ({ commit }, payload) => {  
    sendSigninform: ({commit}, userInfos) => {
        instance.post('/signup', userInfos)
// this.$axios.post(this.$requestBaseURL + 'signup', userInfos)
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem('userToken', token);
            commit('AUTH_SUCCESS')  //commit -> mutation active
            commit('AUTH_SUCCESS_ROLL', response.data.roll)  //commit -> mutation active
            /////      const email = userInfos.email;
            commit('AUTH_SUCCESS_USERID', response.data.userId)
            console.log( this.state.userId);
           // window.location.href = this.$localhost;
            router.push({ path: '/', replace: true})
          })
          .catch((err) => {
            commit('AUTH_ERROR', err)
            localStorage.removeItem('userToken');
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
          commit('AUTH_SUCCESS')
          commit('AUTH_SUCCESS_ROLL', response.data.roll)  //NOT WORKING???
          commit('AUTH_SUCCESS_USERID', response.data.userId)
        //  window.location.href = this.$localhost; //not working...
          router.push({ path: '/', replace: true}) // this worked but not ->? this.$router.push('/')
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
    postComment: (state) => {
      console.log(state);
     /////// authentification //////////
      let userToken = localStorage.getItem('userToken');
      let authToken = { 
        'Authorization': 'Bearer ' + userToken
      };
      console.log(authToken);
      console.log(state.userId); /////////////undefined
      let requestOptions = {
        headers: {authToken, 'user_id': state.userId}
      }
      console.log(requestOptions);
      if (userToken) {
        instance.post('/posts', requestOptions)
        .then((response) => {
          console.log(response);
        
          // return this.list = response.data.result ???
          //router.push({ path: '/', replace: true})
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
        //return this.dataReturnFromParent = 'Vous n\'êtes pas authorizé.';
      }
    


    }
  },
  modules: {
  }

})

