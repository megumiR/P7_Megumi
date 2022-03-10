import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    utilisateurId: null,
    roll: null,   //,token peutetre dans localstorage
    imageFile: null
  },
  getters: {
  /*  Stateimagefile: state => {
      return state.imageFile
    }, */
  },
  mutations: {
    
  //  setImagefile (state, imageFile) {
  //    state.imageFile = imageFile
  //  }
  },
  actions: { //https://openclassrooms.com/en/courses/6390311-creez-une-application-web-avec-vue-js/6870776-modifiez-vos-donnees-dans-vuex
 /*   logIn: ({ commit }, payload) => {
   */   
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