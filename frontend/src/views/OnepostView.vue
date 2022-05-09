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
        <div>
            <div class="PostCard__iconblock">
                <div class="PostCard--icon PostCard--iconmargin">
                        <i class="far fa-heart fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                        <i class="fas fa-heart fa-lg PostCard--iconposition PostCard--iconcolor" @click="increment()"></i>
                        <div>{{ numberOfLikes }}</div>
                </div>
                <div class="PostCard--icon PostCard--iconmargin">
                        <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                        <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconcolor" @click="incrementDislike()"></i>
                        <div>{{ numberOfDislikes }}</div>
                </div>
            </div>
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
      dataReturnFromParent: "msg from parent",  //emit is working

      numberOfLikes : 0,
      numberOfDislikes : 0,
      userId: localStorage.getItem('userID'),  
      roll: '',
      isLiked: localStorage.getItem('isLiked'),
      image: ''
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

increment: function () {
        this.isLiked = JSON.parse(localStorage.getItem('isLiked')); 
        console.log(this.isLiked);
                 
          if (!this.isLiked ) { //  || this.isLiked not include userid,,,
              console.log('no one liked yet');
              localStorage.setItem('isLiked', this.userId );
             
              console.log('isLiked: ' +this.isLiked);
              this.numberOfLikes--;
           
          } else {
              this.isLiked = '';
              console.log('isLiked: ' +this.isLiked);
              this.numberOfLikes++;
          }
        }
          /*
          let likePost = react.likePost;
          console.log(likePost);
          
          if (isReacted == true && likePost == true) {
            this.numberOfLikes--;
            reaction.push({ 'likePost' : 'false'});
            localStorage.setItem('reaction', reaction); 
          } else if (isReacted == true && likePost == false) {
            this.numberOfLikes++;
            reaction.push({ 'likePost' : 'true'});
            localStorage.setItem('reaction', reaction); 
          } else {
            isReacted = false; 
          }
*/
      },
      incrementDislike: function () {
        this.numberOfDislikes++;
       // this.numberOfDislikes = 'counté';
      },

  
}

</script>

<style lang="scss">

</style>
