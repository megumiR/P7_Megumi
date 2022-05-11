<template>
    <div class="formField ">
        <form encType="multipart/form-data">
            <div class="form__contentpost">
                <label for="title">{{ TitleLabel }}: </label>
                <br />
                <input type="text" name="title" id="title" value="Pas de title" @keyup="title = $event.target.value" required /> 
  
                <p id="titleErrorMsg"></p>
            </div>

            <div class="form__contentpost">
                <label for="content">{{ ContentAreaLabel }}: </label>
                <br />
                <textarea name="content" id="content" rows="5" cols="33" placeholder="Ecrivez ici votre message !" @keyup="content = $event.target.value" required> 
                </textarea>
                
                <p id="contentErrorMsg"></p>
            </div>

            <div class="form__contentpost">
                <label for="image">{{ imageLabel }}: </label>
                <br />
                <input type="file" name="image" id="image" accept="image/png, image/jpeg" @change="showFileName" required>
                <p class="filename" v-if="imageFileName">image ajouté ! {{ imageFileName }}</p>
                
                <p id="imageErrorMsg"></p>
            </div>
               
            <div class="form__contentpost">
                <button class="button" @click.prevent="postComment">{{ ButtonLabel }}</button>
            </div>
        </form>

    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

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
          image: ''
      }
  },
  validations: {
    title: {required,},
    content: {required,}, 
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
    postComment: async function() {

     /////// authentification //////////
      let userToken = localStorage.getItem('userToken');

      const formData = new FormData();
      formData.append('file', this.image);
      formData.append("title", this.title);
      formData.append("content", this.content);
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
    }
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