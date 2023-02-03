<template>
  <AppHeaderVue class="fixed" :isLoggedIn="isLoggedIn" />
    <router-view></router-view>
  <FooterComp />
</template>

<script>
import AppHeaderVue from './components/AppHeader.vue';
import FooterComp from "./components/Footer.vue"
import { getAuth, onAuthStateChanged } from "./utilities/firebase"
export default {
  components:{AppHeaderVue,FooterComp},
  data(){
    return{
      isLoggedIn : false
    }
  },
  computed : {
    getLoginInfo(){
      return this.isLoggedIn
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
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
    console.log(this.$router)
  },
}
</script>

<style>

</style>