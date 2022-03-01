<template>
    <div class="formField ">
        <form>
            <div class="form__commentpost">
                <label for="postname">{{ PostnameLabel }}: </label>
                <br />
                <input type="name" name="postname" id="postname" placeholder="Jean" required /> 
                <p id="postnameErrorMsg"><!-- ci est un message d'erreur --></p>
            </div>

            <div class="form__commentpost">
                <label for="comment">{{ CommentEreaLabel }}: </label>
                <br />
                <textarea name="comment" id="comment" rows="5" cols="33" placeholder="Ecrivez ici votre message !" required> 
                </textarea>
                <p id="commentErrorMsg"><!-- ci est un message d'erreur --></p>
            </div>

            <div class="form__commentpost">
                <label for="addImage">{{ imageLabel }}: </label>
                <br />
                <input type="file" name="addImage" id="addImage" accept="image/png, image/jpeg" required>
                <p id="imageErrorMsg"><!-- ci est un message d'erreur --></p>
            </div>
                
            <div class="form__commentpost form__commentpost--button">
                <input type="submit" value="Envoyer !" id="sendCommentpost">
            </div>
        </form>
        <div class="form__commentpost form__commentpost--button">
            <input type="button" value="Retourner à l'accueil" id="backHome">
        </div>

    </div>
</template>

<script>
export default {
  name: 'FormField',
  props: [
       'PostnameLabel','CommentEreaLabel', 'imageLabel'
  ]
  // on click?
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
input{
    height: 2em;
    margin-top: 6px;
    border: none;

    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
}
textarea{
    border-color: #9e9e9e;
    border-radius: 4px;
    cursor: pointer;
}
.form{
    &__commentpost{

        &--button{
            border-bottom: 0.2em solid #fa3200;
            
        }
    }
}

</style>