<template>
  <div class="signin">
    <WelcomeMsg msg="Bienvenue au Groupomania chat :)" recommend="Si vous voulez créer un post, inscrivez-vous !"/>
    
    <div class="card">
      <div class="card-body">
        <h2 class="formField__msg" v-if="mode == 'signup'">Vous avez déjà un compte ?<span class="text-danger text-decoration-underline" @click="switchToLogin"> Connexion par ici</span></h2>
        <h2 class="formField__msg" v-else>Vous n'avez pas encore de compte ?<span class="text-danger text-decoration-underline" @click="switchToSignup"> Créer un compte</span></h2>

        <form action="">
          <div class="mb-3" v-if="mode == 'signup'">
            <label for="username" class="form-label fs-3">Utilisateur</label>
            <input type="text" class="form-control" name="username" id="username" v-on:blur="validUsername" required /> 
            <p id="userErrorMsg" class="form-text text-danger fs-5">{{ userErrorMsg }}</p>
          </div>


          <div class="mb-3">
            <label for="email" class="form-label fs-3">Email</label>
            <input type="email" class="form-control" name="email" id="email" v-on:blur="validEmail" required /> 
            <p id="emailErrorMsg" class="form-text text-danger fs-5">{{ emailErrorMsg }}</p>  
          </div>

          <div class="mb-3"> 
            <label for="password" class="form-label fs-3">Mot de passe</label>
            <input type="password" class="form-control" name="password" id="password" v-on:blur="validPassword" required /> 
            <p id="passwordErrorMsg" class="form-text text-danger fs-5">{{ passwordErrorMsg }}</p>
          </div>

          <button type="submit" class="btn btn-primary fs-4" v-if="mode == 'signup'" @click.prevent="sendSigninform">inscription</button>
          <button type="submit" class="btn btn-primary fs-4" v-else @click.prevent="sendLoginform">Connexion</button>    
        </form>
      </div>
    </div>
    
  </div>
</template>

<script>

import WelcomeMsg from '../components/WelcomeMsg.vue'
//Vue.use(Vuex)

export default {
  name: 'logIn',  //name: 'SignupView',
  components: {WelcomeMsg},
  data() {
    return {
      mode: 'signup',
      form: {
        name: '',
        email: '', 
        password: '', 
      },
      userErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '', //on n affiche pas d abord mais on change les valeurs dans methods
      showError: false
    }
  },
  methods: {
    switchToLogin: function() {
      this.mode = 'login';
    },
    switchToSignup: function() {
      this.mode = 'signup';
    },
    validUsername: function (e) {
      const checkUsername = /^[a-zA-Zéèàîûôïü -]{2,}$/g;
      console.log('name: '+ this.name);
      console.log('username of input: '+ e.target.value);
      let username = e.target.value;
      this.name = username;
      console.log('user: '+ this.user);
      if (username) {
        let result = checkUsername.test(username); 
        if (result == true) {
          console.log('name : valide');
          this.userErrorMsg = '';
        } else if (result == false) {
          this.userErrorMsg = 'Ce champ "utilisateur" accepte que des caractères et "-"';
          console.log('user name est invalide'); 
        } else {
          console.log('error : username regex ne marche pas');
        }     
      } else {
        this.userErrorMsg = 'L\'utilisateur est obligatoire.';
        console.log('user name est vide');
      }
    },
    validEmail: function (e) {
      const checkEmail = /^[\w. -]+@[\w. -]+\.[\w]{2,3}$/g;
      let email = e.target.value;
      this.email = email;
      if (email) {
        let result = checkEmail.test(email);
        if (result == true) {
          console.log('email : valide');
          this.emailErrorMsg = '';
        } else if (result == false) {
          this.emailErrorMsg = 'Ce champ "email" est invalide. Ecrivez comme abc@xxx.com .';
        } else {
          console.log('error : email regex ne marche pas');
        }
      } else {
        this.emailErrorMsg = 'L\'email est obligatoire.';
        console.log('email est vide');
      }  
    },
    validPassword: function (e) {
      let password = e.target.value;
      this.password = password;
      if (password) {
        const containsUppercase = /[A-Z]/.test(password);
        const containsLowercase = /[a-z]/.test(password);
        const containsNumber = /[0-9]/.test(password);
        const containsSpecialCaracter = /[-/*._@]/.test(password);
        const contains8caracters = /^.{8,}$/.test(password);
        let result = containsUppercase && containsLowercase && containsNumber && containsSpecialCaracter && contains8caracters ;
        if (result == true) {
          console.log('password : valide');
          this.passwordErrorMsg = '';
        } else if (result == false) {
          this.passwordErrorMsg = 'Le mot de passe est invalide. Ecrivez plus que 8 caractaires avec des caractères, des nombres et des caractères speciales suivantes -/*._ et @ .';
        } else {
          console.log('error : password regex ne marche pas');
        }
      } else {
        this.passwordErrorMsg = 'Le mot de passe est obligatoire.';
        console.log('password est vide')
      } 
    },
    sendSigninform: function(e) {
      e.preventDefault();
      
      this.$store.dispatch('sendSigninform', {  //$store.dispatch method triggers actions
        name: this.name,
        email: this.email,
        password: this.password
      })
    },
      
    sendLoginform: function() {
      this.$store.dispatch('sendLoginform', {
        email: this.email,
        password: this.password
      })
    }     
  }
}
</script>

<style lang="scss">
/*
.formField{
  &__msg{
    font-style: bold;
  }
  &__color{
    color: rgb(216, 53, 12);
    cursor: pointer;
  }
}
.rouge{
  color: red;
}
button{
  cursor: pointer;
  border: none;
  border-radius: 8px 8px;
  padding: 10px 45px;
  background-color: #fbd8cf;
  font-size: larger;
  
}*/
</style>