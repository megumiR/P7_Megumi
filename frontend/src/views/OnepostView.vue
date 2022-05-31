<template>
  <div>
    <WelcomeMsg msg="c'est le détail de post selectionné." recommend="Si vous souhaitez liker ou disliker ce post, veuillez appuyer sur le pouces!" />

    <div class="col" v-for="post in list" :key="post.id">
      <div class="card shadow-sm mt-4 h-100">
        <img class="card-img-top" :src="post.image" alt="image" v-if="post.image" />
        <div class="card-body">
          <h3 class="card-title">
            {{ post.title }}
          </h3>
          <p class="card-text">
            {{ post.content }}
          </p>
        </div>
        <div class="card-footer p-4">
          <div class="row">
            <div v-if="likes" class="d-flex flex-column">
              <div class="d-flex justify-content-around align-items-center">
                <i class="far fa-thumbs-up fa-lg" @click="increment()"></i>
                <div>{{ numberOfLikes }}</div>
                <i class="fas fa-thumbs-down fa-lg" @click="incrementDislike()"></i>
                <div>{{ numberOfDislikes }}</div>
              </div>

              <div class="d-flex justify-content-around align-items-center mt-2">
                <p v-if="likes == -1">J'ai disliké</p>
                <p v-if="likes == 1">J'ai liké</p>
              </div>
            </div>

            <div v-else class="col d-flex justify-content-around align-items-center">
              <i class="far fa-thumbs-up fa-lg" @click="increment()"></i>
              <i class="fas fa-thumbs-down fa-lg" @click="incrementDislike()"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-2">
      <router-link :to="`/`" class="btn btn-secondary">Retour à l'Accueil</router-link>
      <router-view />
    </div>
  </div>
  <!--
              <div class="PostCard__iconblock">
                  <div class="PostCard--icon PostCard--iconmargin">
                          <i class="far fa-heart fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                          <i class="fas fa-heart fa-lg PostCard--iconposition PostCard--iconcolor" @click="increment()"></i>
                          <div>{{ numberOfLikes }}</div>
                  </div>
                  <div class="PostCard--icon PostCard--iconmargin">
                          <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                          <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconcolor" @click="incrementDislike()"></i>
                  
                  </div>
                  <div class="PostCard--icon PostCard--iconmargin">
                    <div v-if="likes == -1">disliké</div>
                    <div v-if="likes == 1">liké</div>
                  </div>
              </div>

          </div>

        </div>
    </div>
    -->
</template>

<script>
import WelcomeMsg from "../components/WelcomeMsg.vue";

export default {
  name: "OnepostView",
  components: {
    WelcomeMsg,
  },
  data() {
    return {
      list: [],
      numberOfLikes: "",
      numberOfDislikes: "",
      userId: localStorage.getItem("userID"),
      likes: "",
    };
  },
  mounted() {
    this.getOnePost();
    this.countLikes();
    this.countDislikes();
    this.isLiked();
  },
  methods: {
    getOnePost: function () {
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      let postId = this.$route.params.id;
      if (userToken) {
        this.$axios
          .get(this.$requestBaseURL + "posts/" + postId, requestHeaders)
          .then((response) => {
            return (this.list = response.data.result);
          })
          .catch((err) => {
            throw err;
          });
      } else {
        console.log("no token user");
      }
    },
    countLikes: function () {
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      let postId = this.$route.params.id;
      if (userToken) {
        this.$axios
          .get(this.$requestBaseURL + "like/countLike/" + postId, requestHeaders)
          .then((response) => {
            console.log(JSON.stringify(response.data.result[0].likes)); 
             return this.numberOfLikes = JSON.stringify(response.data.result[0].likes);
          })
          .catch((err) => {
            throw err;
          });
      } else {
        console.log("no token user");
      }
    },
    countDislikes: function () {
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      let postId = this.$route.params.id;
      if (userToken) {
        this.$axios
          .get(this.$requestBaseURL + "like/countDislike/" + postId, requestHeaders)
          .then((response) => {
            console.log(JSON.stringify(response.data.result[0].likes)); 
             return this.numberOfDislikes = JSON.stringify(response.data.result[0].likes);
          })
          .catch((err) => {
            throw err;
          });
      } else {
        console.log("no token user");
      }
    },
    isLiked: function () {
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      let postId = this.$route.params.id;
      if (userToken) {
        let data = {         
          user_id: localStorage.getItem("userID"),
        };
        console.log(data);
        this.$axios     
          .get(this.$requestBaseURL + "like/reaction/" + postId, requestHeaders, data)
          .then((response) => {
            return this.likes = response.data.result[0].likes;
          })
          .catch((err) => {
            throw err;
          });
      } else {
        console.log("no token user");
      }
    },
    increment: function () {
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      let postId = this.$route.params.id;
  console.log(this.likes.result[0].likes);
  console.log(this.likes);
      this.likes = this.likes.result[0].likes;
      
      console.log(this.likes);
      switch (this.likes) {
        case (this.likes == 0):
          this.numberOfLikes++;
          this.likes = 1;
          console.log("case 0 + like");
          if (userToken) {
            let data = {
              likes: this.likes,
              user_id: localStorage.getItem("userID"),
            };
            this.$axios
              .put(this.$requestBaseURL + "like/" + postId, data, requestHeaders)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            console.log("no token user");
          }

          break;
        case (this.likes == 1):
          this.numberOfLikes--;
          this.likes = 0;
          console.log("case like removed");
          if (userToken) {
            let data = {
              likes: this.likes,
              user_id: localStorage.getItem("userID"),
            };
            this.$axios
              .put(this.$requestBaseURL + "like/" + postId, data, requestHeaders)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            console.log("no token user");
          }
          break;
        case (this.likes == -1):
          this.numberOfLikes++;
          this.numberOfDislikes--;
          this.likes = 1;
          console.log("case like");
          if (userToken) {
            let data = {
              likes: this.likes,
              user_id: localStorage.getItem("userID"),
            };
            this.$axios
              .put(this.$requestBaseURL + "like/" + postId, data, requestHeaders)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            console.log("no token user");
          }
          break;
        default:
          console.log("default = no reaction");
          this.numberOfLikes++;
          this.likes = 1;

          if (userToken) {
            let data = {
              likes: this.likes,
              user_id: localStorage.getItem("userID"),
            };
            this.$axios
              .post(this.$requestBaseURL + "like/" + postId, data, requestHeaders)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            console.log("no token user");
          }
      }
    },
    incrementDislike: function () {
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      let postId = this.$route.params.id;

      switch (this.likes) {
        case (this.likes == 0):
          this.numberOfDislikes++;
          this.likes = -1;
          console.log("case 0");
          if (userToken) {
            let data = {
              likes: this.likes,
              user_id: localStorage.getItem("userID"),
            };
            this.$axios
              .put(this.$requestBaseURL + "like/" + postId, data, requestHeaders)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            console.log("no token user");
          }

          break;
        case (this.likes == -1):
          this.numberOfDislikes--;
          this.likes = 0;
          console.log("case dislike");
          if (userToken) {
            let data = {
              likes: this.likes,
              user_id: localStorage.getItem("userID"),
            };
            this.$axios
              .put(this.$requestBaseURL + "like/" + postId, data, requestHeaders)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            console.log("no token user");
          }
          break;
        case (this.likes == 1):
          this.numberOfLikes--;
          this.numberOfDislikes++;
          this.likes = -1;
          console.log("case like");
          if (userToken) {
            let data = {
              likes: this.likes,
              user_id: localStorage.getItem("userID"),
            };
            this.$axios
              .put(this.$requestBaseURL + "like/" + postId, data, requestHeaders)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            console.log("no token user");
          }
          break;
        default:
          console.log("default = no reaction");
          this.numberOfDislikes++;
          this.likes = -1;

          if (userToken) {
            let data = {
              likes: this.likes,
              user_id: localStorage.getItem("userID"),
            };
            this.$axios
              .post(this.$requestBaseURL + "like/" + postId, data, requestHeaders)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            console.log("no token user");
          }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.PostCard__iconblock {
  margin: 1em;
}
</style>
