<template>
  <div id="app">

    <HeaderLogo title="Groupomania chat" />

    <div id="nav">
      <router-link to="/" > Accueil </router-link> |
      <router-link to="/add" > Ajouter un post </router-link> |
      <router-link to="/signup">
        <span v-if="$store.state.utilisateurId">Logout </span>  
        <span v-else>Login </span>
      </router-link> |


    </div>
    <router-view />



    <div id="footer">
      <p>copyright</p>
    </div>

  </div>
</template>

<script>
import HeaderLogo from './components/HeaderLogo'
export default {
  name: 'App',
  components: {    
    HeaderLogo
  }
}/* ????????????????
export default {
  name: 'login',
  data: function () {
    return {
      mode: 'login'
    } 
  },
  methods: {
    @EventListenerNwme: function() {
      this.mode = 'eventlistenedand...';
    }
  }
}    */
/* How can i put the state Login
import Vue from 'vue'
new Vue ({
  el: '#app',
  data: {
    login: false
  },
  methods: {
    functionName: function() {
      this.login = true;
    }
  }
});*/
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#footer {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;

  background-color: #ececec;  
}
</style>
