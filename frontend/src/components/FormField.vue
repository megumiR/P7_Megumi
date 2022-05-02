<template>
    <div class="formField ">
        <form encType="multipart/form-data">
            <div class="form__contentpost">
                <label for="title">{{ TitleLabel }}: </label>
                <br />
                <input type="text" name="title" id="title" value="Pas de title" @keyup="title = $event.target.value" required /> 
                <p id="titleErrorMsg"><!-- ci est un message d'erreur --></p>
            </div>

            <div class="form__contentpost">
                <label for="content">{{ ContentAreaLabel }}: </label>
                <br />
                <textarea name="content" id="content" rows="5" cols="33" placeholder="Ecrivez ici votre message !" @keyup="content = $event.target.value" required> 
                </textarea>
                <p id="contentErrorMsg"><!-- ci est un message d'erreur --></p>
            </div>

            <div class="form__contentpost">
                <label for="image">{{ imageLabel }}: </label>
                <br />
                <input type="file" name="image" id="image" accept="image/png, image/jpeg" @change="showFileName" required>
                <p class="filename" v-if="imageFileName">image ajouté ! {{ imageFileName }}</p>
                <p id="imageErrorMsg"><!-- ci est un message d'erreur --></p>
            </div>
                
            <div class="form__contentpost">
                <button class="button" @click.prevent="postComment">Envoyer !</button>
            </div>
        </form>

    </div>
</template>

<script>
export default {
  name: 'FormField',
  props: [
       'TitleLabel','ContentAreaLabel', 'imageLabel'
  ],
  data () {
      return {
          title: '',
          content: '',
          imageFileName: '',
          image: ''
      }
  },
  updated: function () {
    
    this.postComment();
  },
  methods: {
    showFileName: function(event) {
     
       // event.preventDefault();
        let imageFileName = event.target.files[0].name;
        this.imageFileName = imageFileName;
        console.log('this.imageFileName ->>>>>');
        console.log(this.imageFileName); 
        this.image = event.target.files[0];
        console.log('this.image ->>>>>');
        console.log(this.image);    
    },
    postComment: async function() {
      /*  this.$store.dispatch('postComment', {postname: this.postname,comment: this.comment,img: this.img})
    }*/
     /////// authentification //////////
      let userToken = localStorage.getItem('userToken');
  /*    let authToken = { 
        'authorization': 'Bearer ' + userToken
      };
      let userID = localStorage.getItem('userID');
      let authUserID = { 
        'user_id': userID 
      };
      let requestOptions = {
        headers: {
            'authorization': 'Bearer ' + userToken,
             'user_id': localStorage.getItem('userID')
        }
      } */  
      console.log(this.content);
      console.log('this.image ->>>>>');
      console.log(this.image); 
      const formData = new FormData();
      formData.append('file', this.image);

      formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("user_id", localStorage.getItem('userID'));
      console.log(formData);
     /* let postData = {
          postname: this.postname,
          comment: this.comment,
        //  image: this.image  //this.imageFileName
      }; */
    
      if (userToken) {
        //instance.post('/posts', requestOptions)       
        this.$axios.post(this.$requestBaseURL + "posts/", formData, {
            headers: {
              Authorization: "bearer " + userToken
            },
          })

        /*.post(this.$requestBaseURL + 'posts', formData, {
            headers: {
                'authorization': 'Bearer ' + userToken,
                'user_id': localStorage.getItem('userID'),
            //    'Content-Type': 'json.....' //'multipart/form-data'
                }, postData
            })*/
        .then((response) => {
          console.log('response');
          console.log(response);
          console.log(response.data); //undefini dont exist maybe?


          //router.push({ path: '/', replace: true})
        })
        .catch((err) => {
          throw err;
        })
      } else {
        console.log('no token user');
        //return this.dataReturnFromParent = 'Vous n\'êtes pas authorizé.';
      }
    }
}
/*
const file = document.querySelector('#image');
file.addEventListener('change', (event) => {
    const [file] = event.target.files;
    const { name: fileName } = file;
   // const fileSize = (size / 1000).toFixed(2);

 //   const fileNameAndSize = `${fileName} - ${fileSize}KB`;
    document.querySelector('.filename').textContent = `${fileName}`;
});*/


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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