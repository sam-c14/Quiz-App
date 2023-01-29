<template>
    <AppHeaderVue ref="AppHeader" class="fixed" :isLoggedIn="isLoggedIn" />
    <router-view></router-view>
</template>

<script>
import AppHeaderVue from './components/AppHeader.vue';
import firebase from "./utilities/firebase"
export default {
  components:{AppHeaderVue},
  data(){
    return{
      isLoggedIn : false
    }
  },
  mounted() {
    const auth = firebase.getAuth();
    firebase.onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        this.isLoggedIn = true
        // ...
      } else {
        // User is signed out
        // ...
        this.isLoggedIn = false
      }
    });
  },
}
</script>

<style>

</style>