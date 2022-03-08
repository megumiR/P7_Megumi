<template>
  <div class="home" id="home">
    <WelcomeMsg msg="Bienvenu :)" recommend=""/>

    <PostCard v-for="post in list" :key="post" :post="post" />    
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
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch('http://localhost:3000/api/posts')
        .then( response => response.json())
        .then( data => (this.list = data.result));
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
