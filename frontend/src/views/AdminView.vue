<template>
    <div class="admin">
        <WelcomeMsg msg="Bienvenue. Voici la liste d'utilisateur" recommend="Vous pouvez gérer les comptes d'utilisateurs sur cette page." />
    
        <div class="col">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Adresse électronique</th>
                        <th scope="col">Roll</th>
                        <th scope="col">Supprimer le compte</th>
                    </tr>
                </thead>
                <tbody  v-for="account in list" :key="account.id">
                    <tr>
                        <th scope="row">{{ account.id }}</th>
                        <th>{{ account.name }}</th>
                        <th>{{ account.email }}</th>
                        <th>{{ account.roll }}</th>
                        <th>
                          <router-link :to="`/admin/${account.id}`" class="btn btn-outline-dark">
                            Supprimer 
                          </router-link>
                          <router-view />
                        </th>
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
//import router from "@/router";
import WelcomeMsg from "../components/WelcomeMsg.vue";

export default {
  name: "AdminView",
  components: {
    WelcomeMsg,
  },
  data() {
    return {
      list: [],
    /*  id: "",
      name: "",
      email: "",
      roll: "",
*/
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

  }
}
</script>

<style lang="scss" scoped>
</style>