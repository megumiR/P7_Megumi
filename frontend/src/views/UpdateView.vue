<template>
  <div class="update">
    <h2>{{ userName }}, voici c'est votre article sélectionnée!</h2>

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

    <div class="flex">
      <div class="PostCard__button--form" @click.prevent="deletePost" >
        Supprimer
      </div> 
    </div>
     
    <div class="formField">
      <form encType="multipart/form-data">
        <div class="form__contentpost">
          <label for="title">Nouveau titre: </label>
          <br />
          <input type="text" name="title" id="title" value="Pas de title" @keyup="title = $event.target.value" required /> 

          <p id="titleErrorMsg"></p>
        </div>

        <div class="form__contentpost">
          <label for="content">Nouvelle description: </label>
          <br />
          <textarea name="content" id="content" rows="5" cols="33" placeholder="Ecrivez ici votre message !" @keyup="content = $event.target.value" required> 
          </textarea>
                
          <p id="contentErrorMsg"></p>
        </div>
<!--
        <div class="form__contentpost">
          <label for="image">Changer votre image: </label>
          <br />
          <input type="file" name="image" id="image" accept="image/png, image/jpeg" @change="showFileName" required>
          <p class="filename" v-if="imageFileName">image ajouté ! {{ imageFileName }}</p>
                
          <p id="imageErrorMsg"></p>
        </div>
          -->     
        <div class="form__contentpost">
          <button class="button" @click.prevent="updatePost">
            Modification envoyer !
          </button>
        </div>
      </form>
    </div>
  
  </div>
</template>

<script>
import { mapState } from 'vuex'  
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'UpdateView',
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
      let postId = this.$route.params.id;
      if (userToken) {
        this.$axios.put(this.$requestBaseURL + "posts/" + postId , formData, {
            headers: {
              Authorization: "bearer " + userToken
            },
          }) 
        .then((response) => {
          console.log(response);
          window.location.href = this.$localhost; 
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
      }
      
    },
    deletePost: function() {
      let userToken = localStorage.getItem('userToken');
      let requestHeaders = {
        headers: {'Authorization': 'Bearer ' + userToken}
      }
      let postId = this.$route.params.id;
      if (userToken) {
        this.$axios.delete(this.$requestBaseURL + 'posts/' + postId, requestHeaders) 
        .then((response) => {
          console.log(response);
          window.location.href = this.$localhost;
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

<style lang="scss" scoped>
.flex{
  display: inline-block;
}
.PostCard{
    &__img{
        max-height: 5em;
        max-width: 10em;
        align-self: center;
        &--form{
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
    &__textblock{
        position: relative;
        bottom: -3em;
        right: -1em;
    }
}
</style>