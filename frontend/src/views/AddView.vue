<template>
  <div class="add">
    <h2 v-if="userName">{{ userName }}, ajouter votre article sur la plateforme !</h2>
    <h2 v-else>Ajouter votre article sur la plateforme !</h2>
    <FormField TitleLabel='Titre' ContentAreaLabel='Description' imageLabel='Ajouter une image' ButtonLabel='Envoyer !'/>
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