<template>
  <div class="home" id="home">
<!--    <HeaderLogo title="Groupomaniaaa" />

    <nav>
      <NavLink url="/" text="Accueil" />
      <NavLink url="/add" text="Ajouter un post" />
      <NavLink url="/signin" text="Logout" />
    </nav>

  <div id="nav">
    <router-link to="/" > accueil </router-link> |
    <router-link to="/add" > Ajouter un post </router-link> |
    <router-link to="/signin" > Logout </router-link> |
  </div>
  <router-view />

-->


    <WelcomeMsg msg="Bienvenu :)" recommend=""/>

    <PostCard />
  </div>
</template>

<script>
import WelcomeMsg from '../components/WelcomeMsg.vue'
import PostCard from '../components/PostCard.vue'

export default {
  name: 'AccueilView',
  components: {
    WelcomeMsg,
    PostCard
  }
}

</script>

<style lang="scss">
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
