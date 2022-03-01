<template>
  <div id="app">

    <HeaderLogo title="Groupomania chat" />
<!-- ne marche pas
    <nav>
      <NavLink url="/" text="Accueil" />
      <NavLink url="/add" text="Ajouter un post" />
      <NavLink url="/signin" text="Logout" />
    </nav>
-->
  <div id="nav">
    <router-link to="/" > Accueil </router-link> |
    <router-link to="/add" > Ajouter un post </router-link> |
    <router-link to="/signin" > Login/Logout </router-link> |
  </div>
  <router-view />


  <div id="footer">
    <p>copyright</p>
  </div>

  </div>
</template>

<script>

import HeaderLogo from './components/HeaderLogo'
//import NavLink from './components/NavLink'

export default {
  name: 'App',
  components: {
    
    HeaderLogo,
  //  NavLink
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
