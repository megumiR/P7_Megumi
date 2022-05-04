<template>
  <div class="update">
    <h2>{{ userName }}, modifier votre article !</h2>
    <div>Post: {{ $route.params.id }} </div>
    <FormField TitleLabel='Titre à modifier' ContentAreaLabel='Description à modifier' imageLabel='Changer votre image' ButtonLabel='Envoyer comme un nouveau post!'/>
            <div class="form__contentpost">
                <button class="button" @click.prevent="updateComment">Modification envoyer !</button>
            </div> 
  </div>
</template>

<script>
import FormField from '../components/FormField.vue'
import { mapState } from 'vuex'  

export default {
  name: 'UpdateView',
  components: {
    FormField
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
    this.updateComment();
  },
  methods: {
    updateComment: function() {
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