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
                  <div class="PostCard--icon PostCard--iconmargin">
                    <div v-if="likes == -1">disliké</div>
                    <div v-if="likes == 1">liké</div>
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
      numberOfLikes : '',
      userId: localStorage.getItem('userID'),  
      likes: ''
    }
  }, 
  mounted() {
    this.getOnePost();
    this.countLikes();
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
    countLikes: function() {
      let userToken = localStorage.getItem('userToken');
      let requestHeaders = {
        headers: {'Authorization': 'Bearer ' + userToken}
      }
      let postId = this.$route.params.id;
      if (userToken) {
        this.$axios.get(this.$requestBaseURL + 'like/' + postId , requestHeaders) 
        .then((response) => { 
        //  return this.numberOfLikes = response.data.result[0].COUNT;
          console.log(response.data.result[0]);
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
      }
    },
    isLiked: function() {            /////////////not working??/////
      let userToken = localStorage.getItem('userToken');
      let requestHeaders = {
        headers: {'Authorization': 'Bearer ' + userToken}
      }
      let postId = this.$route.params.id;
      if (userToken) {
        let data = {
          "user_id": localStorage.getItem('userID')
        };
        this.$axios.get(this.$requestBaseURL + 'like/react/' + postId, data, requestHeaders) 
        .then((response) => { 
          return this.likes = response.data;
        //  console.log(response.data);
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
    let postId = this.$route.params.id;

    switch (this.likes) {
      case (this.likes = 0):
        this.numberOfLikes++;            
        this.likes = 1;
        console.log('case 0 + like');
        if (userToken) {  
          let data = {
            "likes": this.likes,
            "user_id": localStorage.getItem('userID')
          };
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
        
        break;
      case (this.likes = 1):
        this.numberOfLikes--;
        this.likes = 0; 
        console.log('case like removed');
        if (userToken) {  
          let data = {
            "likes": this.likes,
            "user_id": localStorage.getItem('userID')
          };
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
        break;
      case (this.likes = -1):
        this.numberOfLikes++;
        this.numberOfDislikes--;
        this.likes = 1;
        console.log('case like');
        if (userToken) {  
          let data = {
            "likes": this.likes,
            "user_id": localStorage.getItem('userID')
          };
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
        break;
      default:
        console.log('default = no reaction');
        this.numberOfLikes++;
        this.likes = 1;
        
        if (userToken) { 
          let data = {
            "likes": this.likes,
            "user_id": localStorage.getItem('userID')
          };
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
    }

  },
  incrementDislike: function () {
    let userToken = localStorage.getItem('userToken');
    let requestHeaders = {
      headers: {'Authorization': 'Bearer ' + userToken}
    } 
    let postId = this.$route.params.id;

    switch (this.likes) {
      case (this.likes = 0):
        this.numberOfDislikes++;            
        this.likes = -1;
        console.log('case 0');
        if (userToken) {  
          let data = {
            "likes": this.likes,
            "user_id": localStorage.getItem('userID')
          };
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
        
        break;
      case (this.likes = -1):
        this.numberOfDislikes--;
        this.likes = 0; 
        console.log('case dislike');
        if (userToken) {  
          let data = {
            "likes": this.likes,
            "user_id": localStorage.getItem('userID')
          };
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
        break;
      case (this.likes = 1):
        this.numberOfLikes--;
        this.numberOfDislikes++;
        this.likes = -1;
        console.log('case like');
        if (userToken) {  
          let data = {
            "likes": this.likes,
            "user_id": localStorage.getItem('userID')
          };
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
        break;
      default:
        console.log('default = no reaction');
        this.numberOfDislikes++;
        this.likes = -1;
        
        if (userToken) { 
          let data = {
            "likes": this.likes,
            "user_id": localStorage.getItem('userID')
          };
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
    }
    
  },
}
}

</script>

<style scoped lang="scss">
.PostCard__iconblock {
  margin: 1em;
}
</style>
