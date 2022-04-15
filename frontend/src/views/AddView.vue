<template>
  <div class="add">
    <h2>Ajouter votre comment sur le plateform !</h2>
    <FormField PostnameLabel='Votre nom' CommentEreaLabel='Comment' imageLabel='Ajouter une image'/>
  </div>
</template>

<script>
import FormField from '../components/FormField.vue'


export default {
  name: 'AddView',
  components: {
    FormField
  },
 /* data() {
  },
  */
  updated: function () {
    this.postComment();
  },
  methods: {
    postComment: function() {
      let userToken = localStorage.getItem('userToken');
      let authToken = { 
        'Authorization': 'Bearer ' + userToken
      };
      console.log(authToken);
      let requestHeaders = {
        headers: authToken
      }

      if (userToken) {
        this.$axios.post(this.$requestBaseURL + 'posts', requestHeaders)
        .then((response) => {
          console.log(response);
         // return this.list = response.data.result
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
        //return this.dataReturnFromParent = 'Vous n\'êtes pas authorizé.';
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>