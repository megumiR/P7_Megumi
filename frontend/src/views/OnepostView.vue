<template>
    <div>
        <WelcomeMsg msg="Bienvenue :) " recommend=""/>
        <div class="PostCard" v-for="post in list" :key="post.id" >
          
          <div class="PostCard__img">
              <img class="PostCard__img--form" :src="post.image" alt="image" v-if="post.image"/>
          </div>  
          
          <div class="PostCard__textblock">
              Titre: {{ post.title }}<br/>
              Description: <br/>
              {{ post.content }}

              <div class="PostCard__iconblock">
                  <div class="PostCard--icon PostCard--iconmargin">
                          <i class="far fa-heart fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                          <i class="fas fa-heart fa-lg PostCard--iconposition PostCard--iconcolor" @click="increment()"></i>
                          <div>{{ numberOfLikes }}</div>
                  </div>
                  <div class="PostCard--icon PostCard--iconmargin">
                          <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                          <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconcolor" @click="incrementDislike()"></i>
                         
                  </div>
              </div>

          </div>

        </div>
    </div>
</template>

<script>
import WelcomeMsg from '../components/WelcomeMsg.vue'

export default {
  name: 'OnepostView',
  components: {
    WelcomeMsg
  },
  data() {
    return {
      list: [],
      numberOfLikes : 0,
     // numberOfDislikes : 0,
      userId: localStorage.getItem('userID'),  
      likes: ''
    }
  }, 
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
      let userToken = localStorage.getItem('userToken');
      let requestHeaders = {
        headers: {'Authorization': 'Bearer ' + userToken}
      }        
      if (!this.likes) {
        console.log('no one liked yet');
        this.numberOfLikes++;            
        this.likes = 1; // 1 = like, -1 = dislike , 0 = no reaction
        let data = {
          "likes": this.likes,
          "user_id": localStorage.getItem('userID')
        };
        let postId = this.$route.params.id;
        if (userToken) { 
          this.$axios.post(this.$requestBaseURL + 'like/' + postId, data , requestHeaders)
              .then((response) => { 
               console.log(response);
              })
              .catch((err) => {
                throw err;
              })
            } else {
              console.log('no token user');
            }

        } else {  // this.likes est déjà existé
          this.numberOfLikes--;
          this.likes = 0; 
          let data = {
            "likes": this.likes,
            "user_id": localStorage.getItem('userID')
          };
          console.log('ELSE data: '+ data);
          let postId = this.$route.params.id;
          if (userToken) {  //
            this.$axios.put(this.$requestBaseURL + 'like/' + postId, data , requestHeaders) 
            .then((response) => { 
              console.log(response);
            })
            .catch((err) => {
              throw err;
            })
        } else {
          console.log('no token user');
        }
      }
    }
  },
  incrementDislike: function () {
    let userToken = localStorage.getItem('userToken');
    let requestHeaders = {
      headers: {'Authorization': 'Bearer ' + userToken}
    } 
    let data = {
        "likes": this.likes,
        "user_id": localStorage.getItem('userID')
    };
    let postId = this.$route.params.id;

    switch (this.likes) {
      case null:
        this.numberOfDislikes++;            
        this.likes = -1;
        console.log('case null');

        if (userToken) { 
          this.$axios.post(this.$requestBaseURL + 'like/' + postId, data , requestHeaders)
            .then((response) => { 
             console.log(response);
            })
            .catch((err) => {
              throw err;
            })
        } else {
          console.log('no token user');
        }
        break;
      case -1:
        this.numberOfDislikes--;
        this.likes = 0; 
        console.log('case dislike');
        
        break;
      case 1:
        this.numberOfLikes--;
        this.numberOfDislikes++;
        this.likes = -1;
        console.log('case like');
        break;
      default:
        console.log('default = no reaction');
        this.numberOfDislikes++;
        this.likes = -1;
    }
    
/*

    if (!this.likes) {
      console.log('I ve not disliked yet');
      //this.numberOfLikes = ;
      this.numberOfDislikes++;            
      this.likes = -1; // 1 = like, -1 = dislike , 0 = no reaction
      let data = {
        "likes": this.likes,
        "user_id": localStorage.getItem('userID')
      };
      let postId = this.$route.params.id;
      if (userToken) { 
        this.$axios.post(this.$requestBaseURL + 'like/' + postId, data , requestHeaders)
            .then((response) => { 
             console.log(response);
            })
            .catch((err) => {
              throw err;
            })
      } else {
        console.log('no token user');
      }

    } else if (this.likes = -1) {  // this.likes est déjà existé , disliké

      this.numberOfDislikes--;
      this.likes = 0; 
      let data = {
        "likes": this.likes,
        "user_id": localStorage.getItem('userID')
      };
      console.log('Else: already disliked: data: '+ data);
      let postId = this.$route.params.id;
      if (userToken) {  
        this.$axios.put(this.$requestBaseURL + 'like/' + postId, data , requestHeaders) 
        .then((response) => { 
          console.log(response);
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
      }
    } else if(this.likes = 1) { // this.likes est déjà existé , liké
      this.numberOfLikes--;
      this.numberOfDislikes++;
      this.likes = -1; 
      let data = {
        "likes": this.likes,
        "user_id": localStorage.getItem('userID')
      };
      console.log('Else: already disliked: data: '+ data);
      let postId = this.$route.params.id;
      if (userToken) {  
        this.$axios.put(this.$requestBaseURL + 'like/' + postId, data , requestHeaders) 
        .then((response) => { 
          console.log(response);
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
      }

    } else { //  this.likes est enlevé liké/disliké     this.likes = 0
      this.numberOfDislikes++;
      this.likes = -1; 
      let data = {
        "likes": this.likes,
        "user_id": localStorage.getItem('userID')
      };
      console.log('Else: already disliked: data: '+ data);
      let postId = this.$route.params.id;
      if (userToken) {  
        this.$axios.put(this.$requestBaseURL + 'like/' + postId, data , requestHeaders) 
        .then((response) => { 
          console.log(response);
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
      }
    }
  */

  },
}

</script>

<style scoped lang="scss">
.PostCard__iconblock {
  margin: 1em;
}
</style>
