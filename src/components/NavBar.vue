<template>
  <b-navbar toggleable="lg" type="light" variant="warning" sticky v-if="isSignedIn">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand>Lightning Talk</b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-button
        v-if="isSignedIn"
        variant="light"
        @click="handleClickSignOut"
      >
        Sign Out
      </b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { auth } from '@/utils/firebase.js';

export default {
  data() {
    return {
      isSignedIn: auth.currentUser
    };
  },
  methods: {
    async handleClickSignOut () {
      await auth.signOut();
      this.$router.replace({ name: 'Login' });
    }
  }
}
</script>
