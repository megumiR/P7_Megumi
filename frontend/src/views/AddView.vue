<template>
  <div class="add">
    <h2 v-if="userName">{{ userName }}, ajouter votre comment sur le plateform !</h2>
    <h2 v-else>Ajouter votre comment sur le plateform !</h2>
    <FormField PostnameLabel='Votre nom' CommentEreaLabel='Comment' imageLabel='Ajouter une image'/>
  </div>
</template>

<script>
import FormField from '../components/FormField.vue'
import { mapState } from 'vuex'  

export default {
  name: 'AddView',
  components: {
    FormField
  },
 /* data() {
  },
  */
  computed: {
    ...mapState([ 'userName' ])
  }
}
</script>

<style lang="scss" scoped>

</style>