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
                          <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconcolor" @click="numberOfDislikes++"></i>
                          <div>{{ numberOfDislikes }}</div>
                  </div>
              </div>

          </div>

        </div>
    </div>
</template>

<script>
import WelcomeMsg from '../components/WelcomeMsg.vue'
//import { mapState } from 'vuex' 

export default {
  name: 'OnepostView',
  components: {
    WelcomeMsg
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
      likes: ''
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
        console.log('local'+ this.isLiked);
        let userToken = localStorage.getItem('userToken');         
          if (!this.isLiked ) { //  || this.isLiked not include userid,,,
              console.log('no one liked yet');
              localStorage.setItem('isLiked', this.userId );
              this.isLiked = localStorage.getItem('isLiked');
              console.log('isLiked: ' +this.isLiked);
              this.numberOfLikes++;
           
            
            /*let requestHeaders = {
              headers: {'Authorization': 'Bearer ' + userToken}
            }*/
            this.likes = 1; // 1 = like, -1 = dislike , '' = no reaction
            const formData = new FormData();
            formData.append("likes", this.likes);
            formData.append("user_id", localStorage.getItem('userID'));
            console.log(formData);
            let postId = this.$route.params.id;
            if (userToken) {    //
              this.$axios.post(this.$requestBaseURL + 'like/' + postId, formData ,{
                headers: {
                  Authorization: "bearer " + userToken
                },
              })
              .then((response) => { 
               // return this.list = response.data.result
               console.log(response);
              })
              .catch((err) => {
                throw err;
              })
            } else {
              console.log('no token user');
            }

          } else {
            localStorage.removeItem('isLiked');
             // this.isLiked = '';
            console.log('ELSE -- isLiked: ' +this.isLiked);
              //delete
            this.numberOfLikes--;
            this.likes = ''; // 1 = like, -1 = dislike , '' = no reaction
            const formData = new FormData();
      //      formData.append("likes", this.likes);
            formData.append("user_id", localStorage.getItem('userID'));
            console.log(formData);
            let postId = this.$route.params.id;
            if (userToken) {  //
              this.$axios.delete(this.$requestBaseURL + 'like/' + postId, formData , {
                headers: {
                  Authorization: "bearer " + userToken
                },
              }) 
              .then((response) => { 
               // return this.list = response.data.result
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
        this.numberOfDislikes++;
       // this.numberOfDislikes = 'counté';
      },

  
}

</script>

<style scoped lang="scss">
.PostCard__iconblock {
  margin: 1em;
}
</style>
