<template>
  <div class="signin">
    <WelcomeMsg msg="Bienvenu au Groupomania chat :)" recommend="Si vous voulez créer un post, inscrivez-vous !"/>
    
    <div class="formField">
      <p class="formField__msg" v-if="mode == 'signup'">Vous avez déjà un compte ?<span class="formField__color" @click="switchToLogin"> Connexion par ici</span></p>
      <p class="formField__msg" v-else>Vous n'avez pas encore de compte ?<span class="formField__color" @click="switchToSignup"> Créer un compte</span></p>
<!--      <form id="signinForm" @submit="checkForm" action="" method="post" novalidate="true">
        <div v-if="errors.length">
          Vous avez des erreurs suivantes.
          <ul>
            <li :key="error in errors"> {{ error }} </li>
          </ul>
        </div>
-->   <form id="signinForm" action="">
        <div class="form__commentpost" v-if="mode == 'signup'">
          <label for="username">Utilisateur : </label>
            <br />
          <input type="text" name="username" id="username" v-on:blur="validUsername" required /> <!-- @blur="validUsername" -->
          <p id="userErrorMsg">{{ userErrorMsg }}</p>
        </div>


        <div class="form__commentpost">
          <label for="email">Email : </label>
            <br />
          <input type="email" name="email" id="email" required /> 
     <!--     <p id="emailErrorMsg"></p>  -->
        </div>

        <div class="form__commentpost"> 
          <label for="password">Mot de passe : </label>
            <br />
          <input type="password" name="password" id="password" required /> 
          <p id="passwordErrorMsg"><!-- ci est un message d'erreur --></p>
        </div>

        <div class="">
          <div class="form__commentpost" v-if="mode == 'signup'">
         <!--   <router-link to="/">    <input type="submit" value="Signin" id="sendSigninform"> -->
              <button class="button" @click="sendSigninform">inscription</button>
        <!--    </router-link> -->
          </div>
          <div class="form__commentpost" v-else>
       <!--     <input type="submit" value="Login" id="sendLoginform">   -->
            <button class="button" id="sendLoginform">Connexion</button>
          </div>
        <!--  <router-view /> -->
        </div>

      </form>
    </div>
  </div>
</template>

<script>

import WelcomeMsg from '../components/WelcomeMsg.vue'
//import { mapActions } from 'vuex';
//Vue.use(Vuex)

export default {
  name: 'logIn',  //name: 'SignupView',
  components: {WelcomeMsg},
  data() {
    return {
//      msg: 'message ici ', {{ msg }} pour affichier
      mode: 'signup',
      form: {
        user: '',
        email: '',
        password: ''
      },
      userErrorMsg: '',
      showError: false
    }
  },
/*  computed: {
    
    validEmail: function (email) {
      const validationEmail = /^[\w. -]+@[\w. -]+\.[\w]{2,3}$/g;
      if (this.user !== "" && this.email !== "" && this.password !== "") {
        return validationEmail.match(email);
      } else {
        console.log('tous les champs sont obligatoire')
      }  
    },
    validPassword: function (password) {
      const validationPassword = /^[éèàîûôïü\w. -/*._@]+$/g;
      if (this.user !== "" && this.email !== "" && this.password !== "") {
        return validationPassword.match(password);
      } else {
        console.log('tous les champs sont obligatoire')
      } 
    }
  },*/
  methods: {
    switchToLogin: function() {
      this.mode = 'login';
    },
    switchToSignup: function() {
      this.mode = 'signup';
    },
    validUsername: function (e) {
      const checkUsername = /^[a-zA-Zéèàîûôïü -]{2,}$/g;
      console.log('user: '+ this.user);
      console.log('username of input: '+ e.target.value);
      let username = e.target.value;
      this.user = username;
      console.log('user: '+ this.user);
      if (this.user) {
        let result = checkUsername.test(username); 
        // return checkUsername.test(username); 
        if (result == true) {
          console.log('user : valide');
        } else if (result == false) {
          this.userErrorMsg = 'Ce champ "utilisateur" accepte que des lettres et "-"';
          console.log('user name est invalide'); 
        } else {
          console.log('error');
        }     
      } else {
        this.userErrorMsg = 'L\'utilisateur est obligatoire et ce champ accepte que des lettres et "-"';
        console.log('user name est vide');
      }
    },
    sendSigninform: function() {
      
      console.log('sendSigninform: ' , this.email);
    },
   // login: 
    /*    ...mapActions(['logIn']),  //store actions:{ login({commit}, amount){ commit('mutationsstuff',amount)}
    async submit() {

    }*/
  }

}


/*
const formField = new Vue ({
  el: '#formField',
  data: {
    errors: [],
    email: null,
    password: null
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      if (this.email && this.password) {
        return true;
      }
      this.errors = [];

      if(!this.email) {
        this.errors.push('L\'adresse mail est obligatoire. Ecrivez comme abc@xxx.com');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('L\'adresse mail est invalide. Ecrivez comme abc@xxx.com');
      }
      if (!this.password) {
        this.errors.push('Le mot de passe est obligatoire. des caractères, des nombres et des caractères speciales suivantes -/*._ et @ .')
      } 
      
    },
    validEmail: function (email) {
      const validationEmail = /^[\w. -]+@[\w. -]+\.[\w]{2,3}$/g;
      return validationEmail.match(email);
    },
    validPassword: function (password) {
      const validationPassword = /^[éèàîûôïü\w. -/*._@]+$/g;
      return validationPassword.match(password);
    }
  }
})
*/

</script>

<style lang="scss">
.formField{
  &__msg{
    font-style: bold;
  }
  &__color{
    color: rgb(216, 53, 12);
    cursor: pointer;
  }
}
button{
  cursor: pointer;
  border: none;
  border-radius: 8px 8px;
  padding: 10px 45px;
  background-color: #fbd8cf;
  font-size: larger;
  
}
</style>