<template>
  <div class="update">
    <h2>{{ userName }}, modifier ou supprimer votre article !</h2>
    <PostCard  
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

export default {
  name: 'UpdateView',
  components: {
    PostCard
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapState([ 'userName' ])
  },
  updated: function () {
    this.updatePost();
  },
  methods: {
    getOnePost: function() {

    },
    updatePost: function() {
      let userToken = localStorage.getItem('userToken');
      let requestHeaders = {
        headers: {'Authorization': `Bearer ${userToken}`}
      }
      console.log(this.content); //undefined

      if (userToken) {
        this.$axios.put(this.$requestBaseURL + 'posts/' , requestHeaders) //  posts/:id need to add...
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
  }/* ,
  route: [
    { path: '/update/:id'} //{ path: '/update/:id', components: UpdateView}
  
  ]  */
  //const router = new VueRouter ({

}

</script>

<style lang="scss" scoped>

</style>