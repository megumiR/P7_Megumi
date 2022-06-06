<template>
  <div>
    <WelcomeMsg msg="Confirmation" recommend="Voulez-vous supprimer ce compte ?" />

    <div class="col" v-for="account in list" :key="account.id">
      <div class="card shadow-sm mt-4 h-100">
        <div class="card-body">
          <h3 class="card-title">
            {{ account.name }}
            [ {{ account.roll }} ]
          </h3>
          <p class="card-text">
            {{ account.email }}
          </p>
        </div>        
      </div>

      <div class="mt-4">
        <button type="submit" class="btn btn-primary" @click.prevent="deleteAcount">Confirmer</button>
      </div>
    </div>

    <div class="my-2">
      <router-link :to="`/admin`" class="btn btn-secondary">Retour à la page admin</router-link>
      <router-view />
    </div>
  </div>
</template>

<script>
import WelcomeMsg from "../components/WelcomeMsg.vue";
//import router from "@/router";

export default {
  name: "AdminDeletecomfe",
  components: {
    WelcomeMsg,
  },
  data() {
    return {
      list: [],
      userId: localStorage.getItem("userID"),
     // likes: "",
    };
  },
  mounted() {
    this.getOnePost();
  },
  methods: {
    getOnePost: function () {
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      let accountId = this.$route.params.id;
      if (userToken) {
        this.$axios
          .get(this.$requestBaseURL + "/userlist/" + accountId, requestHeaders)
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
    deleteAcount: function () {
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      let accountId = this.$route.params.id;
      if (userToken) {
        this.$axios
          .delete(this.$requestBaseURL + "/userlist/" + accountId, requestHeaders)
          .then((response) => {
            console.log(response);
           // router.replace({ path: "/admin" });
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

<style scoped lang="scss">

</style>
