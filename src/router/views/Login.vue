<template>
  <b-container
    fluid
    class="text-center mt-4 d-flex justify-content-center"
  >
    <form>
      <div class="form-header">
        <h3>Welcome to our Lightning talk of Firebase and VueJS</h3>
        <h4>Please use with your login credentials to continue</h4>
      </div>

      <div class="form-fields">
        <div class="form-group">
          <label>Email address</label>
          <input
            v-model="email"
            type="email"
            class="form-control form-control-lg"
          >
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="pwd"
            type="password"
            class="form-control form-control-lg"
          >
        </div>

        <button
          class="btn btn-dark btn-lg btn-block"
          @click="handleSignIn"
        >
          Sign In
        </button>
        <p class="mt-3">
          {{ errorMessage }}
        </p>
        <forgot-password/>
      </div>
    </form>
  </b-container>
</template>

<script>
  import { auth } from '@/utils/firebase';
  import ForgotPassword from '../../components/ForgotPassword.vue';

  export default {
    components: { ForgotPassword },
    data() {
        return {
          email: '',
          pwd: '',
          errorMessage: ''
        };
    },
    methods: {
      handleSignIn () {
        auth.signInWithEmailAndPassword(this.email, this.pwd)
          .then(() => {
            this.$router.replace({ name: 'Home' });
          })
          .catch((error) => {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password')
              this.errorMessage = 'Bad credentials, please try again!';
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
.form-header {
  margin: auto;
}

.form-fields {
  padding-top: 20px;
  max-width: 430px;
  position: inherit;
  margin: auto;
}

@media (max-width:431px) {
  .form-header {
    width: 80%;
  }
  .form-fields {
    font-size: .5em;
  }
}
</style>