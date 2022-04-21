<template>
  <div class="home" id="home">
    <WelcomeMsg msg="Bienvenue :) " recommend=""/>

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
  /* ************OLD ONE******************** ...mapActions(['fetchAllPosts'])
    fetchAllPosts: function() {
      console.log(this.list);
      this.$store.dispatch('fetchAllPosts', {
        list : this.list
      })
    }  */
    fetchAllPosts: function() {
      let userToken = localStorage.getItem('userToken');
      let authToken = { 
        'Authorization': 'Bearer ' + userToken
      };
      console.log(authToken);
      let requestHeaders = {
        headers: authToken
      }
   /*  const instance = this.$axios.create({
        baseURL: 'http://localhost:3000/api/'
      });      */
      if (userToken) {
        //instance.get('/posts', requestHeaders)
        this.$axios.get(this.$requestBaseURL + 'posts', requestHeaders)
        .then((response) => {
          console.log(response);
          console.log(response.data.result);
/***************** Cannot get n show the image blob as image*/
     //     if (response.data.result.length > 0 && ) {
            console.log('result exists');
            let result = response.data.result;
            result.forEach(post => {
              if (post.image != null) {
                console.log('image'+JSON.stringify(post.image) + 'post id' + post.id);
                console.log('blob converting...');
              //  let fileName = new Date().getTime() + ".png";  
                const blob = new Blob([post.image]); //, fileName
                console.log(blob);
                const reader = new FileReader();
                reader.onload = function() {
                  console.log(JSON.stringify(reader.result));
                  reader.readAsDataURL(blob);
                  console.log(reader.readAsDataURL(blob));
                }
              } else {
                console.log('no image for id:' + post.id)
              }
              
            });
       //   }
       /*   console.log('blob converting...');
          const blob = new Blob([result[10].image.data], [result[10].image.type]);
          const reader = new FileReader();
          reader.onload = () => {
            console.log(reader.result);
            reader.readAsDataURL(blob);
            console.log(reader.readAsDataURL(blob));
          }  */

/******************* */
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
