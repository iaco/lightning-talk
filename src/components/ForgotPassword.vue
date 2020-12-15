<template>
  <div>
    <b-button variant="link" @click="showModal()">Forgot Password?</b-button>
    <b-modal ref="my-modal" hide-footer title="Forgot Password?">
      <div class="d-block">
        <p>Type your email below for instructions to reset your password</p>
      </div>
      <b-input-group prepend="Email" class="mt-2">
        <b-form-input v-model="email"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="sendResetEmail()">Send</b-button>
        </b-input-group-append>
      </b-input-group>
      <div class="mt-3 info text-center" v-show="this.showMessage">
        <p>Reset instructions sent!</p>
        <p>Check your <strong>{{ this.email }}</strong> inbox</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import { auth } from '@/utils/firebase';
  export default {
    data() {
      return {
        email: '',
        showMessage: false
      };
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      toggleModal() {
        this.$refs['my-modal'].toggle('#toggle-btn')
      },
      sendResetEmail() {
        auth.sendPasswordResetEmail(this.email).then(function() {
          setTimeout(2000, () => {
            this.toggleModal();
            this.showMessage = false;
          });
        }).catch(function(error) {
          console.log(error);
        });
        this.showMessage = true;
      }
    }
  }
</script>