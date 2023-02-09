<template>
  <AppHeaderVue @toggle-dark-mode="toggleDarkMode" class="fixed" />
    <router-view></router-view>
  <FooterComp />
</template>

<script>
import AppHeaderVue from './components/AppHeader.vue';
import FooterComp from "./components/Footer.vue"
import { getAuth, onAuthStateChanged } from "./utilities/firebase"
import {useAuthStore} from "./store/auth"
import {useUniversalStore} from "./store/universal"
export default {
  components:{AppHeaderVue,FooterComp},
  mounted() {
    const auth = getAuth();
    const store = useAuthStore()
    console.log(store.loginStatus)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        store.setLoginStatus(true)
        // ...
      } else {
        // User is signed out
        // ...
        store.setLoginStatus(false)
      }
    });
    console.log(store.loginStatus)
    // this.toggleDarkMode()
    const universalStore = useUniversalStore()
    console.log(universalStore.darkModeStatus)
  },
  methods : {
    toggleDarkMode() {
      const store = useUniversalStore()
      let prev = store.darkModeStatus
      store.setDarkModeStatus(!prev)
      if (store.darkModeStatus) {
        document.documentElement.style.transition = "background .2s"
        document.documentElement.style.backgroundColor = "#333"
        const cardContent = document.getElementById('card-content')
        cardContent ? cardContent.style.color = "#aaa" : ""
        const cards = [...document.querySelectorAll('#quiz-card')]
        if (cards.length > 1) {
          cards.map(card => {
            card.style.border = "1px solid #aaa"
          })
        }
        const label = document.getElementById("label")
        label ? label.style.color = "#bbb" : ''
        document.scrollingElement.st
      }
      else {
        document.documentElement.style.backgroundColor = "white"
        const cardContent = document.getElementById('card-content')
        cardContent ? cardContent.style.color = "#000" : ""
        const cards = [...document.querySelectorAll('.quiz-card')]
        if (cards.length > 1) {
          cards.map(card => {
            card.style.border = "none"
          })
        }
        const label = document.getElementById("label")
        label ? label.style.color = "#000" : ''
      }
    }
  }
}
</script>

<style>

</style>