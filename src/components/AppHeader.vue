<template>
  <div ref="AppHeader" class="text-gray-200 py-1 z-50 w-full top-0 app-header">
    <div class="flex py-3 pl-2 w-11/12 justify-between">
        <router-link to="/" class="text-sm font-bold">QuizGame</router-link>
        <div class="w-10/12 flex justify-around">
            <router-link to="/quiz/science" class="text-sm tracking-wide font-medium">Quiz</router-link>
            <!-- <router-link to="/result/:id" class="text-sm tracking-wide font-medium">Results</router-link> -->
            <router-link to="/login" v-if="!isLoggedIn" class="text-sm tracking-wide font-medium">Login</router-link>
            <router-link to="/" @click="logout" v-else class="text-sm tracking-wide font-medium">Logout</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from "../utilities/firebase"
export default {
  props : ["isLoggedIn"],
  methods: {
    logout(){
      const auth = firebase.getAuth();
      firebase.signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
  },
mounted(){
  window.addEventListener("scroll", (e) => {
    let details = document.body.getBoundingClientRect()
    let appHeader = this.$refs.AppHeader
    if (details.width < 640) {
      if (details.top < -33) {
        appHeader.style.borderBottom = ' 4px solid rgb(191 ,219 ,254,0.3)'
        appHeader.style.backdropFilter = ' blur(10px)'
      }
    }
    else if (details.width < 840) {
      if (details.top < -60) {
        appHeader.style.borderBottom = ' 2px solid rgb(191 ,219 ,254,0.3)'
        appHeader.style.backdropFilter = ' blur(10px)'
      }
    }
    else if (details.width < 1024) {
      if (details.top < -80) {
        appHeader.style.borderBottom = ' 2px solid rgb(191 ,219 ,254,0.3)'
        appHeader.style.backdropFilter = ' blur(10px)'
      }
    }
    else if (details.width < 1440 || details.width > 1440) {
      if (details.top < -80) {
        appHeader.style.borderBottom = ' 2.5px solid rgb(191 ,219 ,254,0.3)'
        appHeader.style.backdropFilter = ' blur(10px)'
      }
    }
    if (details.top >= 0) {
      appHeader.style.borderBottom = 'none'
      appHeader.style.backdropFilter = 'unset'
    }
  });
}
}
</script>
<style>
.app-header{
  transition: all.4s linear;
}
</style>