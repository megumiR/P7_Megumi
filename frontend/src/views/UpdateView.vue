<template>
  <div class="update">
    <h2>{{ userName }}, modifier ou supprimer votre article !</h2>
    <PostCard  v-for="post in list" 
      :key="post.id" 
      
      :image="post.image" 
      :content="post.content" 
      :title="post.title"
      :authorId="post.user_id"
      :postId="post.id"
      @emitname="(e) => dataReturnFromParent = e "
      />  
            
    <div class="PostCard__button--form" @click.prevent="deletePost">Supprimer ce post</div> 
  
        <div class="formField ">
        <form encType="multipart/form-data">
            <div class="form__contentpost">
                <label for="title">Titre à modifier: </label>
                <br />
                <input type="text" name="title" id="title" value="Pas de title" @keyup="title = $event.target.value" required /> 
  
                <p id="titleErrorMsg"></p>
            </div>

            <div class="form__contentpost">
                <label for="content">Description à modifier: </label>
                <br />
                <textarea name="content" id="content" rows="5" cols="33" placeholder="Ecrivez ici votre message !" @keyup="content = $event.target.value" required> 
                </textarea>
                
                <p id="contentErrorMsg"></p>
            </div>

            <div class="form__contentpost">
                <label for="image">Changer votre image: </label>
                <br />
                <input type="file" name="image" id="image" accept="image/png, image/jpeg" @change="showFileName" required>
                <p class="filename" v-if="imageFileName">image ajouté ! {{ imageFileName }}</p>
                
                <p id="imageErrorMsg"></p>
            </div>
               
            <div class="form__contentpost">
                <button class="button" @click.prevent="updatePost">Modification envoyer !</button>
            </div>
        </form>

    </div>
  </div>
</template>

<script>
import PostCard from '../components/PostCard.vue'
import { mapState } from 'vuex'  
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'UpdateView',
  components: {
    PostCard
  },
  data() {
    return {         
      list: [], 
      title: '',
      content: '',
      imageFileName: '',
      image: ''
    }
  },
  validations: {
    title: {required,},
    content: {required,}, 
  },
  computed: {
    ...mapState([ 'userName' ])
  },
  updated: function () {
    this.updatePost();
  },
  methods: {
    getOnePost: function() {
      let userToken = localStorage.getItem('userToken');
      let requestHeaders = {
        headers: {'Authorization': 'Bearer ' + userToken}
      }
      let search_params = new URLSearchParams(document.location.search);
      let postId = search_params.get('postId');
      console.log('URL postid ----> '+ postId);
      if (userToken) {
        this.$axios.get(this.$requestBaseURL + 'posts' + postId , requestHeaders) // need post id
        .then((response) => {
          console.log(response);
          console.log(response.data.result);  
          return this.list = response.data.result
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
      }
    },
    showFileName: function(event) {
      event.preventDefault();
      this.imageFileName = event.target.files[0].name;
      this.image = event.target.files[0];
    },
    updatePost: function() {
      let userToken = localStorage.getItem('userToken');
      const formData = new FormData();
      formData.append('file', this.image);
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("user_id", localStorage.getItem('userID'));
      console.log(formData);
      
      if (userToken) {
        this.$axios.put(this.$requestBaseURL + "posts/", formData, {
            headers: {
              Authorization: "bearer " + userToken
            },
          }) //  posts/:id need to add...
        .then((response) => {
          console.log(response);
         // window.location.href = this.$localhost; 
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
      }
      
    },
    deletePost: function() {
//      let postDeleteId = ;
      let userToken = localStorage.getItem('userToken');
      let authToken = { 
        'Authorization': 'Bearer ' + userToken
      };
      console.log(authToken);
      let requestHeaders = {
        headers: authToken
      }
      if (userToken) {
        this.$axios.get(this.$requestBaseURL + 'posts/' , requestHeaders) //  /:id need to add...
        .then((response) => {
          console.log(response);
          
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
      }
    },

  }/* ,
  route: [
    { path: '/update/:id'} //{ path: '/update/:id', components: UpdateView}
  
  ]  */
  //const router = new VueRouter ({

}

</script>

<style lang="scss" scoped>

</style>