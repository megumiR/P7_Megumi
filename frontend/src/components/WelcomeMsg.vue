<template>
  <div class="hello">
    <h1>{{ msg }} {{ userIdNumber }}</h1>
    <p>
      {{ recommend }}
      <br />
          
      <a href="#" target="_blank" rel="noopener">La page Groupomania </a>.
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    recommend: String
  },
  computed: {
    ...mapState({
      userIdNumber: 'userId'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

a {
  color: #481a83;
}
</style>
