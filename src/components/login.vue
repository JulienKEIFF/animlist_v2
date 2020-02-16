<template>
  <div id="login">
    <section>
      <div class="container" :class="{ 'signup-form': !showLoginForm && !showPasswordReset }">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>AnimList</h1>
          <label for="email1">Adresse E-mail</label>
          <input v-model.trim="loginForm.email" type="text" placeholder="vous@email.com" id="email1" />

          <label for="password1">Password</label>
          <input v-model.trim="loginForm.password" type="password" placeholder="*************" id="password1" />

          <button @click="login" class="button">Connexion</button>

          <div class="extras">
            <button @click="togglePasswordReset">Mot de passe oublier</button>
            <button @click="toggleForm">Creer un compte</button>
          </div>
        </form>

        <form v-if="!showLoginForm && !showPasswordReset" @submit.prevent>
          <h1>Get Started</h1>

          <label for="name">Name</label>
          <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />

          <label for="email2">Email</label>
          <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

          <label for="password2">Password</label>
          <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />

          <button @click="signup" class="button">Sign Up</button>

          <div class="extras">
              <button @click="toggleForm">Back to Log In</button>
          </div>
        </form>

        <form v-if="showPasswordReset" @submit.prevent class="password-reset">
          <div v-if="!passwordResetSuccess">
            <h1>Mot de passe oublier</h1>
            <p>Nous allons vous envoyer un mail pour reinitialiser le mot de passe </p>

            <label for="email3">Email</label>
            <input v-model.trim="passwordForm.email" type="text" placeholder="Votre mail" id="email3">

            <button @click="resetPassword" class="button">Envoyer</button>

            <div class="extras">
              <button @click="togglePasswordReset">Retour à la connexion</button>
            </div>
          </div>
          <div v-else>
            <h1>Email Envoyer</h1>
            <p>Verifier vos mail pour avoir le lien de reinitialisation de votre mot de passe</p>
            <button @click="togglePasswordReset">Retour à la connexion</button>
          </div>
        </form>

      </div>
    </section>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          email: '',
          password: ''
        },
        signupForm: {
          name: '',
          email: '',
          password: '',
        },
        passwordForm: {
          email: ''
        },
        showLoginForm: true,
        showPasswordReset: false,
        passwordResetSuccess: false,
      }
    },
    methods: {
      toggleForm() {
        this.showLoginForm = !this.showLoginForm
      },
      login() {
        fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/dashboard')
        }).catch(err => {
          console.log(err)
        })
      },
      signup() {      
        fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
          this.$store.commit('setCurrentUser', user)
          
          if(user.user.uid){
            // create user obj
            fb.usersCollection.doc(user.user.uid).set({
              name: this.signupForm.name,
              isAdmin: false,
              animeLike: [],
              animeView: [],
              animeList: [],
              mangaLike: [],
              mangaView: [],
              mangaList: []
            }).then(() => {
              this.$store.dispatch('fetchUserProfile')
              this.$router.push('/library')
            }).catch(err => {
              console.log(err)
            }).catch(err => {
              console.log(err)
            })
          }else{
            console.error('error : ' + user.uid)
          }
        })
      },
      togglePasswordReset() {
        this.showPasswordReset = !this.showPasswordReset
        this.showLoginForm = !this.showLoginForm
      },
      resetPassword() {
        fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
          this.performingRequest = false
          this.passwordResetSuccess = true
          this.passwordForm.email = ''
        }).catch(err => {
          console.log(err)
          this.performingRequest = false
          this.errorMsg = err.message
        })
      }
    },
  }
</script>

<style scoped lang='scss'>
.container{
  width: 40%;
  height: 50%;
  margin: 100px auto 0 auto;
  background-color: white;
  padding: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.253);
  h1{
    margin: 5px auto 0 auto;
    text-align: center;
    font-size: 40px;
    text-transform: uppercase;
    margin-bottom: 70px;
  }
  label{
    display: block;
    margin: 10px 0 3px 20px;
    font-size: 20px;
    text-transform: uppercase;
  }
  input{
    display: block;
    height: 30px;
    width: calc(100% - 55px);
    margin: 0 0 20px 20px;
    font-weight: bold;
  }
  button{
    width: 175px;
    height: 40px;
    text-transform: uppercase;
    padding: 0;
    margin: 5px 0 5px 20px;
    background-color: #ff867c;
    border: none;
    font-weight: bold;
    font-size: 12px;
    color: white;
  }
  p{
    margin: 5px 0 15px 20px;
  }
  .extras{
    margin: 50px auto 0 auto;
    display: flex;
    justify-content: space-between;
    button{
      width: 150px;
      height: 30px;
      text-transform: uppercase;
      font-size: 10px;
      padding: 0;
      margin: 5px 20px 5px 20px;
    }
  }
}

</style>