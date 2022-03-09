<template>
  <div class="update">
    <h2>Modifier votre message !</h2>
    <div>Post: {{ $route.params.id }} </div>
    <FormField CommentEreaLabel='Comment' imageLabel='Changer votre image'/>
  </div>
</template>

<script>
import FormField from '../components/FormField.vue'


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
  updated: function () {
    this.updateData();
  },
  methods: {
    updateData: function() {
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