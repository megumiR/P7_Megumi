<template>
  <div class="home" id="home">
    <WelcomeMsg msg="Bienvenue :) " recommend="Voici les post sur Groupomania chat." />

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3 p-5">
      <p v-if="!list">Pas de post à affichier</p>
  <!--    <PostCard
        v-else
        v-for="post in list"
        :key="post.id"
        :image="post.image"
        :content="post.content"
        :title="post.title"
        :authorId="post.user_id"
        :postId="post.id"
        @emitname="(e) => (dataReturnFromParent = e)"
      />  -->
      <div v-else v-for="post in list" :key="post.id" class="col">
        <div class="card shadow-sm mt-4 h-100"  id="id_post">
          <img class="card-img-top" :src="post.image" :alt="`image pour le post title ${post.title}`" v-if="post.image" />
          <div class="card-body">
            <h3 class="card-title">
              {{ post.title }}
            </h3>
            <p class="card-text">
              {{ post.content }}
            </p>
          </div>
          <div class="card-footer p-4 ">
            <div class="row">
              <div class="col" v-if="userId == post.user_id || `${rollAdmin}` == 'admin'"> <!--  this.$store.getters.rollAdmin--->
                <router-link :to="`/update/${post.id}`" class="btn btn-tertiary">
                  modifier 
                </router-link>
                <router-view />
                <div class="mb-3 my-2">
                  <button type="submit" class="btn btn-danger" @click.prevent="deletePost(post.id)">Supprimer</button>
                </div>
              </div>
              <router-link
                :to="`/onepost/${post.id}`"
                class="col d-flex justify-content-around align-items-center text-decoration-none btn btn-tertiary"
              >
                <i class="far fa-thumbs-up fa-lg text-black"></i>
                <i class="far fa-thumbs-down fa-lg text-black"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>{{ dataReturnFromParent }}</p>
  </div>
</template>

<script>
import WelcomeMsg from "../components/WelcomeMsg.vue";
//import PostCard from "../components/PostCard.vue";
//import { mapState } from "vuex";
import { mapGetters } from "vuex";
//import router from "@/router";

export default {
  name: "AccueilView",
  components: {
    WelcomeMsg,
   // PostCard,
  },
  data() {
    return {
      userId: localStorage.getItem("userID"),
      list: [],
      dataReturnFromParent: "Touts les posts sont affichés.", //emit is working 
    };
  },
  computed: {
  //  ...mapState(["roll"]),
    ...mapGetters(['rollAdmin']),
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
    deletePost: function (id) {
      console.log(id);
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      //let postId = this.$route.params.id;  /////////////////////////////??????
      let data = {
        userId: localStorage.getItem("userID")
      };
      if (userToken) {
        this.$axios
          .delete(this.$requestBaseURL + "posts/" + id, requestHeaders, data)
          .then((response) => {
            console.log(response);
          //  location.reload(id);
            document.querySelector("#id_post").classList.add('d-none');
            //router.go();
          })
          .catch((err) => {
            throw err;
          });
      } else {
        console.log("no token user");
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
