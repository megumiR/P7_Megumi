<template>
  <div class="update">
    <WelcomeMsg msg="voici c'est votre article sélectionnée!" recommend="" />

    <div class="col" v-for="post in list" :key="post.id">
      <div class="card shadow-sm mt-4 h-100">
        <img class="card-img-top" :src="post.image" alt="image" v-if="post.image" />

        <div class="card-body">
          <h3 class="card-title">
            {{ post.title }}
          </h3>
          <p>
            {{ post.content }}
          </p>
        </div>
      </div>

      <div class="mb-3 my-2">
        <button type="submit" class="btn btn-primary fs-4" @click.prevent="deletePost">Supprimer ce post</button>
      </div>

      <div class="card">
        <form encType="multipart/form-data" class="card-body">
          <div class="mb-3">
            <label for="title" class="form-label fs-3">Nouveau titre</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="title"
              :value="post.title"
              v-on:blur="validText"
              required
            />
            <p id="titleErrorMsg" class="form-text text-danger fs-5">{{ titleErrorMsg }}</p>
          </div>

          <div class="mb-3">
            <label for="content" class="form-label fs-3">Nouvelle description</label>
            <textarea
              name="content"
              class="form-control"
              id="content"
              rows="5"
              cols="33"
              placeholder="Ecrivez ici votre message !"
              :value="post.content"
              v-on:blur="validTextContent"
              required
            >
            </textarea>
            <p id="contentErrorMsg" class="form-text text-danger fs-5">{{ contentErrorMsg }}</p>
          </div>

          <button type="submit" class="btn btn-primary fs-4" @click.prevent="updatePost">
            Envoyer la modification
          </button>
        </form>
      </div>

      <div class="my-4">
        <router-link :to="`/`" class="btn btn-secondary">Retour à l'Accueil</router-link>
        <router-view />
      </div>
    </div>
    <!--
   
    <div v-for="post in list" :key="post.id" >
    <div class="PostCard" >
      <div class="PostCard__img">
        <img class="PostCard__img--form" :src="post.image" alt="image" v-if="post.image"/>
      </div>  
      <div class="PostCard__textblock">
        Titre: {{ post.title }}<br/>
        Description: <br/>
        {{ post.content }}
      </div>

    </div>

    <div class="flex">
      <div class="PostCard__button--form" @click.prevent="deletePost" >
        Supprimer
      </div> 
    </div>
     
    <div class="formField">
      <form encType="multipart/form-data">
        <div class="form__contentpost">
          <label for="title">Nouveau titre: </label>
          <br />
          <input type="text" name="title" id="title" :value="post.title" v-on:blur="validText" required /> 

          <p id="titleErrorMsg" class="rouge">{{ titleErrorMsg }}</p>
        </div>

        <div class="form__contentpost">
          <label for="content">Nouvelle description: </label>
          <br />
          <textarea name="content" id="content" rows="5" cols="33" placeholder="Ecrivez ici votre message !" :value="post.content"  v-on:blur="validTextContent" required> 
          </textarea>
                
          <p id="contentErrorMsg" class="rouge">{{ contentErrorMsg }}</p>
        </div>
    
        <div class="form__contentpost">
          <button class="button" @click.prevent="updatePost">
            Modification envoyer !
          </button>
        </div>
      </form>
    </div>
  </div> 
  --></div>
</template>

<script>
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import router from "@/router";
import WelcomeMsg from "../components/WelcomeMsg.vue";

export default {
  name: "UpdateView",
  components: {
    WelcomeMsg,
  },
  data() {
    return {
      list: [],
      title: "",
      content: "",
      imageFileName: "",
      image: "",

      titleErrorMsg: "",
      contentErrorMsg: "",
    };
  },
  validations: {
    title: { required },
    content: { required },
  },
  computed: {
    ...mapState(["userName"]),
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
    showFileName: function (event) {
      event.preventDefault();
      this.imageFileName = event.target.files[0].name;
      this.image = event.target.files[0];
    },
    updatePost: function () {
      let userToken = localStorage.getItem("userToken");
      const formData = new FormData();
      const form_title = document.querySelector("#title").value;
      const form_content = document.querySelector("#content").value;

      formData.append("file", this.image);
      formData.append("title", form_title);
      formData.append("content", form_content);
      formData.append("user_id", localStorage.getItem("userID"));

      let postId = this.$route.params.id;
      if (userToken) {
        this.$axios
          .put(this.$requestBaseURL + "posts/" + postId, formData, {
            headers: {
              Authorization: "bearer " + userToken,
            },
          })
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
    deletePost: function () {
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
    validText: function (e) {
      const checkText = /^[a-zA-Zéèàîûôïü ]{1,}$/g;
      let textInput = e.target.value;
      if (textInput) {
        let result = checkText.test(textInput);
        if (result == true) {
          console.log("titre : valide");
          this.titleErrorMsg = "";
        } else if (result == false) {
          this.titleErrorMsg = "Ce champ accepte que des caractères.";
          console.log("Le titre est invalide");
        } else {
          console.log("error : titre regex ne marche pas");
        }
      } else {
        this.titleErrorMsg = "Ce champ est obligatoire.";
        console.log("Le titre est vide");
      }
    },
    validTextContent: function (e) {
      const checkText = /^[a-zA-Z0-9éèàîûôïü ]{1,}$/g;
      let textInput = e.target.value;
      if (textInput) {
        let result = checkText.test(textInput);
        if (result == true) {
          console.log("content : valide");
          this.contentErrorMsg = "";
        } else if (result == false) {
          this.contentErrorMsg = "Ce champ accepte que des caractères et des chiffres.";
          console.log("La discription est invalide");
        } else {
          console.log("error : content regex ne marche pas");
        }
      } else {
        this.contentErrorMsg = "Ce champ est obligatoire.";
        console.log("La discription est vide");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: inline-block;
}
.PostCard {
  &__img {
    max-height: 5em;
    max-width: 10em;
    align-self: center;
    &--form {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
  &__textblock {
    position: relative;
    bottom: -3em;
    right: -1em;
  }
}
</style>
