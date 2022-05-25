<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">{{ userName }} {{ msg }}</h1>
        <h2 class="lead text-muted fs-5">{{ recommend }}</h2>
        <!--     <p>
          <a href="#" target="_blank" rel="noopener" class="btn btn-primary my-2">La page Groupomania</a>
   //       <a href="#" class="btn btn-secondary my-2">Secondary action</a>  
        </p>   -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
    recommend: String,
  },
  computed: {
    ...mapState({
      userName: "userName",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*
a {
  color: #481a83;
}  */
</style>
