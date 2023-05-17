<template>
  <router-view />
</template>
<script>
import Cookies from "js-cookie";

export default {
  created() {
    const token = Cookies.get("authToken");
    if (token) {
      this.$store.commit("SET_TOKEN", token);
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
