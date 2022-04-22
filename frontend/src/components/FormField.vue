<template>
    <div class="formField ">
        <form>
            <div class="form__commentpost">
                <label for="postname">{{ PostnameLabel }}: </label>
                <br />
                <input type="name" name="postname" id="postname" placeholder="Jean" @keyup="postname = $event.target.value" required /> 
                <p id="postnameErrorMsg"><!-- ci est un message d'erreur --></p>
            </div>

            <div class="form__commentpost">
                <label for="comment">{{ CommentEreaLabel }}: </label>
                <br />
                <textarea name="comment" id="comment" rows="5" cols="33" placeholder="Ecrivez ici votre message !" @keyup="comment = $event.target.value" required> 
                </textarea>
                <p id="commentErrorMsg"><!-- ci est un message d'erreur --></p>
            </div>

            <div class="form__commentpost">
                <label for="addImage">{{ imageLabel }}: </label>
                <br />
                <input type="file" name="addImage" id="addImage" accept="image/png, image/jpeg" @keyup="image = $event.target.value" required>
                <p class="filename" v-if="$store.state.imageFile">image ajouté !</p>
                <p id="imageErrorMsg"><!-- ci est un message d'erreur --></p>
            </div>
                
            <div class="form__commentpost">
                <button class="button" @click.prevent="postComment">Envoyer !</button>
            </div>
        </form>

    </div>
</template>

<script>
export default {
  name: 'FormField',
  props: [
       'PostnameLabel','CommentEreaLabel', 'imageLabel'
  ],
  data () {
      return {
          postname: '',
          comment: '',
          image: ''
      }
  },
  updated: function () {
    this.postComment();
  },
  methods: {
    postComment: function() {
      /*  this.$store.dispatch('postComment', {
            postname: this.postname,
            comment: this.comment,
        //    img: this.img
        })
    }*/
     /////// authentification //////////
      let userToken = localStorage.getItem('userToken');
  /*    let authToken = { 
        'authorization': 'Bearer ' + userToken
      };
      console.log(authToken);
  */ //   let userID = localStorage.getItem('userID');
   //   let authUserID = { 'user_id': userID }
       /* console.log(userID);
        console.log(JSON.parse(userID));
        console.log(JSON.stringify(userID));
     *//* let requestOptions = {
        headers: {
            'authorization': 'Bearer ' + userToken,
             'user_id': localStorage.getItem('userID')
            }
      }
      console.log(requestOptions);
    */  
      console.log(this.postname);
      console.log(this.comment);
    //  console.log(this.image);
      let postData = {
          postname: this.postname,
          comment: this.comment,
         // image: this.image
      }; 
      
      if (userToken) {
        //instance.post('/posts', requestOptions)
        this.$axios.post(this.$requestBaseURL + 'posts', {
            headers: {
                'authorization': 'Bearer ' + userToken,
                'user_id': localStorage.getItem('userID')
                }, postData
            })
        .then((response) => {
          console.log('response');
          console.log(response);
          console.log(response.data.message);
          // return this.list = response.data.result ???
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
const file = document.querySelector('#addImage');
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

#addImage{
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
}
</style>