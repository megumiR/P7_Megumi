<template>
    <div>
        <WelcomeMsg msg="Bienvenue :) " recommend=""/>
        <div class="PostCard" v-for="post in list" :key="post.id" >
        <div class="PostCard__img">
            <img class="PostCard__img--form" :src="image" alt="image" v-if="image"/>
        </div>  
        <div class="PostCard__textblock">
            Titre: {{ post.title }}<br/>
            Description: <br/>
            {{ post.content }}
        </div>
        </div>

    </div>
    
</template>

<script>
import WelcomeMsg from '../components/WelcomeMsg.vue'
//import PostCard from '../components/PostCard.vue'
//import { mapState } from 'vuex' 

export default {
  name: 'OnepostView',
  components: {
    WelcomeMsg,
  //  PostCard
  },
  data() {
    return {
      list: [],
      dataReturnFromParent: "msg from parent"  //emit is working
    }
  }, 
 /* computed: {
    ...mapState([ 'roll' ])
  },*/
  mounted() {
    this.getOnePost();
  },
  methods: {
    getOnePost: function() {
      let userToken = localStorage.getItem('userToken');
      let requestHeaders = {
        headers: {'Authorization': 'Bearer ' + userToken}
      }
      let postId = this.$route.params.id;
      if (userToken) {
        this.$axios.get(this.$requestBaseURL + 'posts/' + postId , requestHeaders) 
        .then((response) => { 
          if ( response.data.result[0].image != null) {
            this.image = `http://localhost:3000/images/${response.data.result[0].image}`;
          }
          return this.list = response.data.result
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
      }
    },

  }
}

</script>

<style lang="scss">

</style>
