<template>
  <div class="home" id="home">
<!--    <HeaderLogo title="Groupomaniaaa" />

    <nav>
      <NavLink url="/" text="Accueil" />
      <NavLink url="/add" text="Ajouter un post" />
      <NavLink url="/signup" text="Logout" />
    </nav>

  <div id="nav">
    <router-link to="/" > accueil </router-link> |
    <router-link to="/add" > Ajouter un post </router-link> |
    <router-link to="/signup" > Logout </router-link> |
  </div>
  <router-view />

-->


    <WelcomeMsg msg="Bienvenu :)" recommend=""/>

    <PostCard />
<!--    v-for="post in list" :key="post" :post="post"  -->
    
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
  },
  data() {
    return {
      list: []
    }
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
