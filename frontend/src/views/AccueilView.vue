<template>
  <div class="home" id="home">
    <WelcomeMsg msg="Bienvenue :) " recommend=""/>

  <!--  <p v-if="this.$store.getters.rollAdmin == admin">{{ roll }}</p>  -->

    <p v-if="!list">Pas de post à affichier</p>
    <PostCard v-else v-for="post in list" 
      :key="post.id" 
      
      :image="post.image" 
      :content="post.content" 
      :title="post.title"
      :authorId="post.user_id"
      :postId="post.id"
      @emitname="(e) => dataReturnFromParent = e "
      />    
      <p>{{ dataReturnFromParent }}</p>
<!--WHY does :key need?
The reason has to do with performance. 
Attribute key helps Vue determine unique items in a list.
Consider the example of sorting. 
If your UI has a sort button for posts, 
then your the order of items in post array will change. 
But does that mean Vue is going to re-render entire list? 
Of course not! Using :key it can determine 
if the item was already rendered on UI. 
It simply shuffles the DOM nodes and saves expensive rendering 
cycles.

Secondly, if you have complex components within your list 
when you are using v-for and :key is not provided, 
then whenever the list is changed or re-ordered, 
it simply changes the DOM but doesn't destroy existing components
and that can cause local state mismatch. 
That is why it is must to have :key attribute.

 :utilisateurId="utilisateurId"
   -->
  </div>
</template>


<script>
import WelcomeMsg from '../components/WelcomeMsg.vue'
import PostCard from '../components/PostCard.vue'
import { mapState } from 'vuex' 

export default {
  name: 'AccueilView',
  components: {
    WelcomeMsg,
    PostCard
  },
  data() {
    return {
      list: [],
      dataReturnFromParent: "msg from parent"  //emit is working
    }
  }, 
  computed: {
    ...mapState([ 'roll' ])
  },
  created: function () {
    this.fetchAllPosts();
  },
  methods: {
    fetchAllPosts: function() {
      let userToken = localStorage.getItem('userToken');
      let authToken = { 
        'Authorization': 'Bearer ' + userToken
      };
      console.log(authToken);
      let requestHeaders = {
        headers: authToken
      }
      if (userToken) {
        this.$axios.get(this.$requestBaseURL + 'posts', requestHeaders)
        .then((response) => {
          return this.list = response.data.result
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
        return this.dataReturnFromParent = 'Vous n\'êtes pas authorizé.';
      }
    },

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
