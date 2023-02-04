<template>
  <div ref="AppHeader" class="sm:text-gray-200 text-gray-700 py-1 z-50 w-full sm:h-auto h-10 top-0 app-header">
    <div class="pr-3 sm:hidden flex justify-end">
      <HamBurgerIcon @click="showMenu" />
    </div>
    <div ref="menu" class="sm:flex transition-all overflow-hidden w-0 text-center gap-y-10 sm:flex-nowrap justify-center flex-wrap py-3 pl-2 sm:w-11/12 sm:justify-between">
        <div>
          <router-link to="/" class="sm:text-sm text-base font-bold">QuizGame</router-link>
          <div class="sm:hidden block">
            <CloseIcon @click="hideMenu"/>
          </div>
        </div>
        <div class="sm:w-10/12 gap-y-8 w-full sm:flex-nowrap text-center sm:text-justify flex-wrap flex justify-center sm:justify-around">
            <router-link v-if="!isLoggedIn" to="/sample-quiz" class="sm:text-sm sm:w-auto w-full text-base tracking-wide font-medium">Quiz</router-link>
            <router-link to="/sample-result" class="sm:text-sm sm:w-auto w-full text-base tracking-wide font-medium">Results</router-link>
            <router-link to="/login/none/none" v-if="!isLoggedIn" class="sm:text-sm sm:w-auto w-full text-base tracking-wide font-medium">Login</router-link>
            <router-link to="/" @click="logout" v-else class="sm:text-sm sm:w-auto w-full text-base tracking-wide font-medium">Logout</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import HamBurgerIcon from "../assets/icons/HamBurgerIcon.vue";
import CloseIcon from "../assets/icons/CloseIcon.vue";
import { getAuth,signOut} from "../utilities/firebase"
export default {
  components : {HamBurgerIcon,CloseIcon},
  props : ["isLoggedIn"],
  methods: {
    logout(){
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        localStorage.clear()
      }).catch((error) => {
        // An error happened.
      });
    },
    showMenu(){
      let appHeader = this.$refs.AppHeader
      appHeader.style.height = "auto"
      this.$refs.menu.style.width = "100%" 
    },
    hideMenu(){
      let appHeader = this.$refs.AppHeader
      appHeader.style.height = "2.5rem"
      this.$refs.menu.style.width = "0" 
    },
  },
mounted(){
  window.addEventListener("scroll", (e) => {
    let details = document.documentElement.getBoundingClientRect()
    let appHeader = this.$refs.AppHeader
    if(appHeader != null || details != null){
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
    }
  });
},
data(){
  return {
    isMenuShowing : false
  }
}
}
</script>
<style>
.app-header{
  transition: all.4s linear;
}
</style>