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
  }
}
</script>

<style lang="scss" scoped>

</style>