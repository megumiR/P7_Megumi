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
  data() {

  },
  updated: function () {
    this.postData();
  },
  methods: {
    postData: function() {
      fetch("post", 'http://localhost:3000/api/posts')
        .then( response => response.json())
        .then( data => (this.list = data.result));
    }
  }
}
</script>

<style lang="scss" scoped>

</style>