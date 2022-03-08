<template>
  <div class="signin">
    <WelcomeMsg msg="Bienvenu au Groupomania chat :)" recommend="Si vous voulez créer un post, inscrivez-vous !"/>
    
    <div class="formField">
      <p class="formField__msg">{{ msg }}</p>
<!--      <form id="signinForm" @submit="checkForm" action="" method="post" novalidate="true">
        <div v-if="errors.length">
          Vous avez des erreurs suivantes.
          <ul>
            <li :key="error in errors"> {{ error }} </li>
          </ul>
        </div>
-->   <form id="signinForm" action="">
        <div class="form__commentpost">
          <label for="username">Utilisateur : </label>
            <br />
          <input type="text" name="username" id="username" @blur="validUsername" required /> 
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
          <div class="form__commentpost form__commentpost--button">
         <!--   <router-link to="/"> -->
              <input type="submit" value="Signin" id="sendSigninform">
        <!--    </router-link> -->
          </div>
          <div class="form__commentpost form__commentpost--button">
            <input type="submit" value="Login" id="sendLoginform">
          </div>
        <!--  <router-view /> -->
        </div>

      </form>
    </div>
  </div>
</template>

<script>
//import { mapActions } from 'vuex';
//Vue.use(Vuex)
//components: {WelcomeMsg},
export default {
  name: 'logIn',  //name: 'SignupView',
  components: {},
  data() {
    return {
      msg: 'Veuillez remplir tous les champs.',
      form: {
        utilisateur: '',
        email: '',
        password: ''
      },

      showError: false
    }
  },
  methods: {
    /*    ...mapActions(['logIn']),  //store actions:{ login({commit}, amount){ commit('mutationsstuff',amount)}
    async submit() {

    }*/
  }

}

/*
  computed: {
    validUsername: function (username) {
      const validUsername = /^[a-zA-Zéèàîûôïü -]{2,}$/g;
      if (this.utilisateur !== "" && this.email !== "" && this.password !== "") {
        return validUsername.test(username);
      } else {
        console.log('tous les champs sont obligatoire')
      }      
    },
    validEmail: function (email) {
      const validationEmail = /^[\w. -]+@[\w. -]+\.[\w]{2,3}$/g;
      if (this.utilisateur !== "" && this.email !== "" && this.password !== "") {
        return validationEmail.match(email);
      } else {
        console.log('tous les champs sont obligatoire')
      }  
    },
    validPassword: function (password) {
      const validationPassword = /^[éèàîûôïü\w. -/*._@]+$/g;
      if (this.utilisateur !== "" && this.email !== "" && this.password !== "") {
        return validationPassword.match(password);
      } else {
        console.log('tous les champs sont obligatoire')
      } 
    } 
  },*/
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
}
input{
  cursor: pointer;
    
}
</style>