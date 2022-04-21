<template>
  <div id="app">

    <HeaderLogo title="Groupomania chat" />

    <div id="nav">
      <router-link to="/" > Accueil </router-link> |
      <router-link to="/add" > Ajouter un post </router-link> |
      <router-link to="/signup">
        <span v-if="userName">Logout par {{ userName }}</span>  
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
import { mapState } from 'vuex'  

export default {
  name: 'App',
  components: {    
    HeaderLogo
  },
  computed: {
    ...mapState([ 'userName' ])
  }
}
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
