<template>
  <div class="home" id="home">
    <WelcomeMsg msg="Bienvenue :) " recommend="Voici les post sur Groupomania chat." />

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3 p-5">
      <p v-if="!list">Pas de post à affichier</p>
      <PostCard
        v-else
        v-for="post in list"
        :key="post.id"
        :image="post.image"
        :content="post.content"
        :title="post.title"
        :authorId="post.user_id"
        :postId="post.id"
        @emitname="(e) => (dataReturnFromParent = e)"
      />
    </div>
    <p>{{ dataReturnFromParent }}</p>
  </div>
</template>

<script>
import WelcomeMsg from "../components/WelcomeMsg.vue";
import PostCard from "../components/PostCard.vue";
import { mapState } from "vuex";

export default {
  name: "AccueilView",
  components: {
    WelcomeMsg,
    PostCard,
  },
  data() {
    return {
      list: [],
      dataReturnFromParent: "msg from parent", //emit is working
    };
  },
  computed: {
    ...mapState(["roll"]),
  },
  created: function () {
    this.fetchAllPosts();
  },
  methods: {
    fetchAllPosts: function () {
      let userToken = localStorage.getItem("userToken");
      let authToken = {
        Authorization: "Bearer " + userToken,
      };
      console.log(authToken);
      let requestHeaders = {
        headers: authToken,
      };
      if (userToken) {
        this.$axios
          .get(this.$requestBaseURL + "posts", requestHeaders)
          .then((response) => {
            return (this.list = response.data.result);
          })
          .catch((err) => {
            throw err;
          });
      } else {
        console.log("no token user");
        return (this.dataReturnFromParent = "Vous n'êtes pas authorizé.");
      }
    },
  },
};
</script>

<style lang="scss">
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
