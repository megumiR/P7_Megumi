<template>
  <div class="add">
    <WelcomeMsg
      msg="Ajoutez votre article sur la plateforme"
      recommend="Veuillez vous connecter si vous ne vous êtes pas encore enregistré ou connecté. "
    />

    <div class="card">
      <form encType="multipart/form-data" class="card-body">
        <div class="mb-3">
          <label for="title" class="form-label fs-3">Titre</label>
          <input
            type="text"
            class="form-control"
            name="title"
            id="title"
            value="Pas de title"
            maxlength="20"
            @blur="validText"
            required
          />
          <!--  @keyup="title = $event.target.value"  -->
          <p id="titleErrorMsg" class="form-text text-danger fs-5">{{ titleErrorMsg }}</p>
        </div>

        <div class="mb-3">
          <label for="content" class="form-label fs-3">Description</label>
          <textarea
            name="content"
            class="form-control"
            id="content"
            rows="5"
            cols="33"
            maxlength="140"
            placeholder="Ecrivez ici votre message !"
            @blur="validTextContent"
            required
          >
          </textarea>
          <!--      @keyup="content = $event.target.value"  -->
          <p id="contentErrorMsg" class="form-text text-danger fs-5">{{ contentErrorMsg }}</p>
        </div>

        <div class="mb-3">
          <label for="image" class="btn btn-secondary">Ajouter une image</label>
          <input
            type="file"
            class="form-control"
            name="image"
            id="image"
            accept="image/png, image/jpeg"
            @change="showFileName"
            required
          />
          <p class="form-text fs-6" v-if="imageFileName">image ajouté >>> {{ imageFileName }}</p>
        </div>

        <button type="submit" class="btn btn-primary fs-4" @click.prevent="postComment">Envoyer !</button>
      </form>
    </div>
    <!--   <div class="formField ">
          <form encType="multipart/form-data">
            <div class="form__contentpost">
                <label for="title">Titre: </label>
                <br />
                <input type="text" name="title" id="title" value="Pas de title" @blur="validText"  required />  
  
                <p id="titleErrorMsg" class="rouge">{{ titleErrorMsg }}</p>
            </div>

            <div class="form__contentpost">
                <label for="content">Description: </label>
                <br />
                <textarea name="content" id="content" rows="5" cols="33" placeholder="Ecrivez ici votre message !" @blur="validTextContent" required> 
                </textarea>                
                
                <p id="contentErrorMsg" class="rouge">{{ contentErrorMsg }}</p>
            </div>

            <div class="form__contentpost">
                <label for="image">Ajouter une image: </label>
                <br />
                <input type="file" name="image" id="image" accept="image/png, image/jpeg" @change="showFileName" required>
                <p class="filename" v-if="imageFileName">image ajouté ! {{ imageFileName }}</p>
                
            </div>
               
            <div class="form__contentpost">
                <button class="button" @click.prevent="postComment">
                  Envoyer !
                </button>
            </div>
        </form>
</div>-->
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import WelcomeMsg from "../components/WelcomeMsg.vue";

export default {
  name: "AddView",
  components: {
    WelcomeMsg,
  },
  data() {
    return {
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
  /* async updated() {  --->> c est la cause de probleme qui envoyer le titre/content tout seul!!!
    await this.postComment();
    this.validText();
    this.validTextContent();
  },*/
  methods: {
    showFileName: function (event) {
      event.preventDefault();
      this.imageFileName = event.target.files[0].name;
      this.image = event.target.files[0];
    },
    postComment: function () {
      let userToken = localStorage.getItem("userToken");
      const formData = new FormData();
      const form_title = document.querySelector("#title").value;
      const form_content = document.querySelector("#content").value;

      formData.append("file", this.image);
      formData.append("title", form_title);
      formData.append("content", form_content);
      formData.append("user_id", localStorage.getItem("userID"));
      console.log(formData);

      if (userToken) {
        this.$axios
          .post(this.$requestBaseURL + "posts/", formData, {
            headers: {
              Authorization: "bearer " + userToken,
            },
          })

          .then((response) => {
            console.log("response" + response);
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
      e.preventDefault();
      const checkText = /^[a-zA-Z0-9éèàîûôïü !';:(){}"-_@+*]{1,20}$/g;

      let textInput = e.target.value;
      if (textInput) {
        let result = checkText.test(textInput);
        if (result == true) {
          this.titleErrorMsg = "";
        } else if (result == false) {
          this.titleErrorMsg = "Ce champ accepte des caractères, des chiffres et quelques caractères spéciales. Ce champ est limité jusqu'à 20 caractères.";
        } else {
          console.log("error : titre regex ne marche pas");
        }
      } else {
        this.titleErrorMsg = "Ce champ est obligatoire.";
      }
    },
    validTextContent: function (e) {
      const checkText = /^[a-zA-Z0-9éèàîûôïü !';:(){}"-_@+*]{1,150}$/g;

      let textInput = e.target.value;
      if (textInput) {
        let result = checkText.test(textInput);
        if (result == true) {
          this.contentErrorMsg = "";
        } else if (result == false) {
          this.contentErrorMsg = "Ce champ accepte des caractères, des chiffres et quelques caractères spéciales. Ce champ est limité jusqu'à 150 caractères.";
        } else {
          console.log("error : content regex ne marche pas");
        }
      } else {
        this.contentErrorMsg = "Ce champ est obligatoire.";
      }
    },
  },
};
</script>

<style lang="scss">
/*.formField{
    width: 90%;
    height: 20em;
    
    margin: 15px 0;
    padding: 20px 0;
    border: 2em solid;
    border-color: #faedea;
}
button {
    cursor: pointer;
    border: none;
    border-radius: 8px 8px;
    padding: 10px 45px;
    background-color: #fbd8cf;
    font-size: larger;
    margin-top: 6px;
}
textarea{
    border-color: #9e9e9e;
    border-radius: 4px;
    cursor: pointer;
}*/

#image {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}
</style>
