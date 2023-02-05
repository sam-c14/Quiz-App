<template>
  <div ref="AppHeader" class="sm:text-gray-200 text-gray-700 py-1 z-50 w-full sm:h-auto h-10 top-0 app-header">
    <div class="px-3 sm:hidden flex justify-between">
      <Transition name="fade" mode="out-in">
      <div class="sm:hidden block" v-if="isMenuShowing">
        <CloseIcon @click="hideMenu" />
      </div>
      <HamBurgerIcon v-else @click="showMenu" />
      </Transition>
    </div>
    <div ref="menu" class="sm:flex transition-all overflow-hidden w-0 text-center gap-y-10 sm:flex-nowrap justify-center flex-wrap py-3 pl-2 sm:w-11/12 sm:justify-between">
        <div class="sm:my-0 mt-2 mb-7">
          <router-link to="/" class="sm:text-sm text-base font-bold">QuizGame</router-link>
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
      let details = document.documentElement.getBoundingClientRect()
      if (details.width < 640){
      let appHeader = this.$refs.AppHeader
      appHeader.style.height = "auto"
      this.$refs.menu.style.width = "100%" 
      this.isMenuShowing = true
      }
    },
    hideMenu(){
      let details = document.documentElement.getBoundingClientRect()
      if (details.width < 640) {
      let appHeader = this.$refs.AppHeader
      appHeader.style.height = "2.5rem"
      this.$refs.menu.style.width = "0" 
      this.isMenuShowing = false
      }
    },
    scrollFunction(e){
  this.isListenerAdded = true
  let details = document.documentElement.getBoundingClientRect()
  let appHeader = this.$refs.AppHeader
  if (appHeader != null || details != null) {
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
    localStorage.setItem("isListenerAdded", JSON.stringify(this.isListenerAdded))
  }
}
  },
mounted(){
  window.addEventListener('resize',()=>{
    let details = document.documentElement.getBoundingClientRect()
    if (details.width > 640) {
      let appHeader = this.$refs.AppHeader
      appHeader.style.height = "auto"
      this.$refs.menu.style.width = "100%"
    }
  })
  let added = JSON.parse(localStorage.getItem("isListenerAdded"))
  console.log(added)
  if(!added){
    window.addEventListener("scroll", this.scrollFunction);
  }
},
unmounted(){
  window.removeEventListener('scroll',this.scrollFunction)
  localStorage.removeItem("isListenerAdded")
},
data(){
  return {
    isMenuShowing : false,
    isListenerAdded : false
  }
}
}
</script>
<style>
.app-header{
  transition: all.4s linear;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>