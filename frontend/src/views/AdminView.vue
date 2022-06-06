<template>
    <div class="admin">
        <WelcomeMsg msg="Bienvenue. Voici la liste d'utilisateur" recommend="Vous pouvez gérer les comptes d'utilisateurs sur cette page." />
    
        <div class="col" v-for="account in list" :key="account.id">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Adresse email</th>
                        <th scope="col">Roll</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{{ account.id }}</th>
                        <th>{{ account.name }}</th>
                        <th>{{ account.email }}</th>
                        <th>{{ account.roll }}</th>
                    </tr>
                </tbody> 
            </table>
        </div>
    
        <div class="my-4">
            <router-link :to="`/`" class="btn btn-secondary">Retour à l'Accueil</router-link>
            <router-view />
        </div>
    </div>
</template>
    
<script>
import { mapState } from "vuex";
import router from "@/router";
import WelcomeMsg from "../components/WelcomeMsg.vue";

export default {
  name: "AdminView",
  components: {
    WelcomeMsg,
  },
  data() {
    return {
      list: [],
      id: "",
      name: "",
      email: "",
      roll: "",

    };
  },
  computed: {
    ...mapState(["userName"]),
  },
  mounted() {
    this.fetchUserList();
  },
  methods: {
    fetchUserList: function () {
      let userToken = localStorage.getItem("userToken");
      let requestHeaders = {
        headers: { Authorization: "Bearer " + userToken },
      };
      if (userToken) {
        this.$axios
          .get(this.$requestBaseURL + "/userlist", requestHeaders)
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
      let postId = this.$route.params.id;
      if (userToken) {
        this.$axios
          .delete(this.$requestBaseURL + "posts/" + postId, requestHeaders)
          .then((response) => {
            console.log(response);
            router.replace({ path: "/" });
          })
          .catch((err) => {
            throw err;
          });
      } else {
        console.log("no token user");
      }
    },

  }
}
</script>

<style lang="scss" scoped>
</style>