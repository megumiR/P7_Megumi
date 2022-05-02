<template>
  <div class="home" id="home">
    <WelcomeMsg msg="Bienvenue :) " recommend=""/>

    <p v-if="!list">Pas de post à affichier</p>
    <PostCard v-else v-for="post in list" 
      :key="post.id" 
      
      :image="post.image" 
      :content="post.content" 
      :title="post.title"
      :autherId="post.user_id"
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
          console.log(response);
          console.log(response.data.result);
          console.log('result exists');
          let result = response.data.result;
          result.forEach(post => {
            if (post.image != null) {
              console.log('an img exist ...');
              console.log(post.image);
          /*   C'est fait sur controller/postjs sur le backend
               let imageUrl = `http://localhost:3000/images/${post.image}`;  
                post.image = imageUrl;*/
            } else {
              console.log('no image for id:' + post.id)
            }              
          });  
          return this.list = response.data.result
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
        return this.dataReturnFromParent = 'Vous n\'êtes pas authorizé.';
      }
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
