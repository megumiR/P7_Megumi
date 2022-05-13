<template>
    <div class="formField ">
        <form encType="multipart/form-data">
            <div class="form__contentpost">
                <label for="title">{{ TitleLabel }}: </label>
                <br />
                <input type="text" name="title" id="title" value="Pas de title"  required />  <!-- @blur="validText"  @keyup="title = $event.target.value"  --> 
  
                <p id="titleErrorMsg" class="rouge">{{ titleErrorMsg }}</p>
            </div>

            <div class="form__contentpost">
                <label for="content">{{ ContentAreaLabel }}: </label>
                <br />
                <textarea name="content" id="content" rows="5" cols="33" placeholder="Ecrivez ici votre message !" required> 
                </textarea>                <!--   @blur="validTextContent"   @keyup="content = $event.target.value"  -->
                
                <p id="contentErrorMsg" class="rouge">{{ contentErrorMsg }}</p>
            </div>

            <div class="form__contentpost">
                <label for="image">{{ imageLabel }}: </label>
                <br />
                <input type="file" name="image" id="image" accept="image/png, image/jpeg" @change="showFileName" required>
                <p class="filename" v-if="imageFileName">image ajouté ! {{ imageFileName }}</p>
                
            </div>
               
            <div class="form__contentpost">
                <button class="button" @click.prevent="postComment">{{ ButtonLabel }}</button>
            </div>
        </form>

    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'  
//import { required, minLength, maxLength,alpha,alphaNum } from 'vuelidate/lib/validators' //ne marche pas-> 

export default {
  name: 'FormField',
  props: [
       'TitleLabel','ContentAreaLabel', 'imageLabel', 'ButtonLabel'
  ],
  data () {
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
    title: {required}, //ne marche pas-> ,minLengthValue: minLength(1), maxLengthValue: maxLength(15),alpha
    content: {required},  //,minLengthValue: minLength(1), maxLengthValue: maxLength(150),alphaNum
  },
  updated: function () {
    this.postComment();
  },
  methods: {
    showFileName: function(event) {
      event.preventDefault();
      this.imageFileName = event.target.files[0].name;
      this.image = event.target.files[0];
    },
    postComment: function() {
   //   event.preventDefault();
     /////// authentification //////////
      let userToken = localStorage.getItem('userToken');

      const formData = new FormData();

/*      formData.append('file', this.image);
      formData.append("title", this.title);
      formData.append("content", this.content);    */  
//////////////////////
      const form_title = document.querySelector('#title').value;
      const form_content = document.querySelector('#content').value;
      

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
      
  
    },/*
    validText: function (e) {
      const checkText = /^[a-zA-Zéèàîûôïü ]{1,}$/g;

     // const form_title = document.querySelector('#title').value;

      let textInput =  e.target.value;// form_title
      if (textInput) {
        let result = checkText.test(textInput); 
        if (result == true) {
          console.log('titre : valide');
          this.titleErrorMsg = '';
        } else if (result == false) {
          this.titleErrorMsg = 'Ce champ accepte que des caractères.';
          console.log('Le titre est invalide'); 
        } else {
          console.log('error : titre regex ne marche pas');
        }     
      } else {
        this.titleErrorMsg = 'Ce champ est obligatoire.';
        console.log('Le titre est vide');
      }
    },
    validTextContent: function (e) {
      //e.preventDefault();
      const checkText = /^[a-zA-Z0-9éèàîûôïü ]{1,}$/g;
      
      //const form_content = document.querySelector('#content').value;

      let textInput = e.target.value;//form_content;
      if (textInput) {
        let result = checkText.test(textInput); 
        if (result == true) {
          console.log('content : valide');
          this.contentErrorMsg = '';
        } else if (result == false) {
          this.contentErrorMsg = 'Ce champ accepte que des caractères et des chiffres.';
          console.log('La discription est invalide'); 
        } else {
          console.log('error : content regex ne marche pas');
        }     
      } else {
        this.contentErrorMsg = 'Ce champ est obligatoire.';
        console.log('La discription est vide');
      }
    },   */
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