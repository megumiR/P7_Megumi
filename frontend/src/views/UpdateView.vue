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
  }/* ,
  route: [
    { path: '/update/:id'} //{ path: '/update/:id', components: UpdateView}
  
  ]  */
  //const router = new VueRouter ({

}

</script>

<style lang="scss" scoped>

</style>