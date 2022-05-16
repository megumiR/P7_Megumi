<template>
  <div class="add">
    <h2 v-if="userName">{{ userName }}, ajouter votre article sur la plateforme !</h2>
    <h2 v-else>Ajouter votre article sur la plateforme !</h2>
<!--    <FormField TitleLabel='Titre' ContentAreaLabel='Description' imageLabel='Ajouter une image' ButtonLabel='Envoyer !'/>
-->
    <div class="formField ">
        <form encType="multipart/form-data">
            <div class="form__contentpost">
                <label for="title">Titre: </label>
                <br />
                <input type="text" name="title" id="title" value="Pas de title" @blur="validText"  required />  <!--  @keyup="title = $event.target.value"  --> 
  
                <p id="titleErrorMsg" class="rouge">{{ titleErrorMsg }}</p>
            </div>

            <div class="form__contentpost">
                <label for="content">Description: </label>
                <br />
                <textarea name="content" id="content" rows="5" cols="33" placeholder="Ecrivez ici votre message !" @blur="validTextContent" required> 
                </textarea>                <!--      @keyup="content = $event.target.value"  -->
                
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

    </div>
  </div>
</template>

<script>
//import FormField from '../components/FormField.vue'
import { mapState } from 'vuex' 
import { required } from 'vuelidate/lib/validators' 

export default {
  name: 'AddView',
//  components: {
//    FormField
//  },
  data() {
      return {
          title: '',
          content: '',
          imageFileName: '',
          image: '',

          titleErrorMsg: '',
          contentErrorMsg: ''
      }
  },
  validations: {
    title: {required}, 
    content: {required},  
  },
  computed: {  //////////////ainchen
    ...mapState([ 'userName' ])
  },
 /* async updated() {
    await this.postComment();
    this.validText();
    this.validTextContent();
  },*/
  methods: {
    showFileName: function(event) {
      event.preventDefault();
      this.imageFileName = event.target.files[0].name;
      this.image = event.target.files[0];
    },
    postComment: function() {   //   event.preventDefault(); ---not working
     /////// authentification //////////
      let userToken = localStorage.getItem('userToken');
      const formData = new FormData();
      const form_title = document.querySelector('#title').value;
      const form_content = document.querySelector('#content').value;
      
/*      formData.append('file', this.image);
      formData.append("title", this.title);
      formData.append("content", this.content);    */  
//////////////////////



        formData.append('file', this.image);
        formData.append("title", form_title);
        formData.append("content", form_content);
        formData.append("user_id", localStorage.getItem('userID'));
        console.log(formData);
      
        if (userToken) {      
          this.$axios.post(this.$requestBaseURL + "posts/", formData, {
              headers: {
                Authorization: "bearer " + userToken
              },
            })

          .then((response) => {
            console.log('response'+ response);
            window.location.href = this.$localhost;   
          })
          .catch((err) => {
            throw err;
          })
        } else {
          console.log('no token user');
        }


    },
    validText: function (e) {
      e.preventDefault();
      const checkText = /^[a-zA-Zéèàîûôïü ]{1,}$/g;

      let textInput =  e.target.value;
      if (textInput) {
        let result = checkText.test(textInput); 
        if (result == true) {
          this.titleErrorMsg = '';
        } else if (result == false) {
          this.titleErrorMsg = 'Ce champ accepte que des caractères.';
        } else {
          console.log('error : titre regex ne marche pas');
        }     
      } else {
        this.titleErrorMsg = 'Ce champ est obligatoire.';
      }
    },
    validTextContent: function (e) {
      const checkText = /^[a-zA-Z0-9éèàîûôïü ]{1,}$/g;
    
      let textInput = e.target.value;
      if (textInput) {
        let result = checkText.test(textInput); 
        if (result == true) {
          this.contentErrorMsg = '';
        } else if (result == false) {
          this.contentErrorMsg = 'Ce champ accepte que des caractères et des chiffres.';
        } else {
          console.log('error : content regex ne marche pas');
        }     
      } else {
        this.contentErrorMsg = 'Ce champ est obligatoire.';
      }
    },   
  }
}
</script>


<style lang="scss">
.formField{
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
}

#image{
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
}
</style>