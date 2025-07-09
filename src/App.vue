<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <router-link to="/dashboard" class="navbar-brand">VueAuth</router-link>
        <div class="navbar-nav ml-auto">
          <router-link v-if="!isLoggedIn" class="nav-link" to="/login">Login</router-link>
          <router-link v-if="!isLoggedIn" class="nav-link" to="/register">Register</router-link>
          <router-link v-if="isLoggedIn" class="nav-link" to="/profile">Profile</router-link>
          <a v-if="isLoggedIn" class="nav-link" href="#" @click.prevent="logout">Logout</a>
        </div>
      </div>
    </nav>
    <router-view @user-logged-in="handleUserLogin"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userToken: localStorage.getItem('user')
    }
  },
  computed: {
    isLoggedIn() {
      return !!this.userToken;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.userToken = null; // Update reactive data
      this.$router.push('/login');
    },
    handleUserLogin() {
      this.userToken = localStorage.getItem('user');
    }
  },
  mounted() {
    // Listen for storage changes from other tabs
    window.addEventListener('storage', () => {
      this.userToken = localStorage.getItem('user');
    });
  }
}
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>