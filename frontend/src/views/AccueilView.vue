<template>
  <div class="home" id="home">
    <WelcomeMsg msg="Bienvenu :) " recommend=""/>
    <p v-if="$store.state.userId">{{ $store.state.userId }}</p>
    <p v-if="$store.state.userId">{{ userId }}</p>


    <p v-if="!list">Pas de post à affichier</p>
    <PostCard v-else v-for="post in list" 
      :key="post.id" 
      
      :image="post.image" 
      :comment="post.comment" 
      :postName="post.postname"
      
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
import { mapState } from 'vuex'  //mapActions,

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
  created: function () {
    this.fetchAllPosts();
  },
  computed: {
    ...mapState([ 'userId' ])
  },
  methods: {
  /* ************OLD ONE******************** ...mapActions(['fetchAllPosts'])
    fetchAllPosts: function() {
      console.log(this.list);
      this.$store.dispatch('fetchAllPosts', {
        list : this.list
      })
    }  */
    fetchAllPosts: function() {
      const instance = this.$axios.create({
        baseURL: 'http://localhost:3000/api/'
      });
      console.log(localStorage.getItem('userToken'));
      let authToken = { 
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      };
      console.log(authToken);
      let requestHeaders = {
        headers: authToken
      }
      instance.get('/posts', requestHeaders)
        .then((response) => {
          console.log(response);
          console.log(response.data.result);
          //let list = response.data.result;
          //return list;
          return data => (this.list = data.result)
        })
        .catch((err) => {
          throw err;
        })
    }
}}

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
