<template>
  <div class="update">
    <h2>Modifier votre message !</h2>
    <FormField CommentEreaLabel='Comment' imageLabel='Changer votre image'/>
  </div>
</template>

<script>
import FormField from '../components/FormField.vue'


export default {
  name: 'UpdateView',
  components: {
    FormField
  }
}
</script>

<style lang="scss" scoped>

</style>