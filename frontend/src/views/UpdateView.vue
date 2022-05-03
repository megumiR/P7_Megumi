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
      fetch("put", 'http://localhost:3000/api/posts/:id')
        .then( response => response.json())
      //  .then( data => (this.list = data.result));
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