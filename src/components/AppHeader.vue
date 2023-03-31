<template>
  <div
    ref="AppHeader"
    class="text-white py-3 sm:pl-5 z-50 w-full sm:h-auto h-16 top-0 overflow-hidden app-header"
  >
    <div class="px-2 sm:hidden flex justify-between">
      <Transition name="fade" mode="out-in">
        <div class="sm:hidden block" v-if="isMenuShowing">
          <CloseIcon class="font-bold text-black" @click="hideMenu" />
        </div>
        <HamBurgerIcon class="font-bold text-black" v-else @click="showMenu" />
      </Transition>
    </div>
    <div
      ref="menu"
      class="sm:flex transition-all overflow-hidden w-0 text-center gap-y-10 sm:flex-nowrap justify-center flex-wrap sm:pl-2 sm:w-11/12 sm:justify-between z-30"
    >
      <div
        class="sm:my-0 mt-2 mb-7 links border-b-none hover:border-b-2 rounded-b-sm sm:px-1 border-white py-3"
      >
        <div
          class="flex justify-center sm:justify-between cursor-pointer gap-x-1"
        >
          <router-link
            to="/"
            class="sm:text-sm mt-0.5 lg:text-lg md:text-base font-bold"
            >QuizGame</router-link
          >
          <span>
            <LoadingImage ref="quizIcon" class="w-6 h-6" />
          </span>
        </div>
      </div>
      <div
        class="sm:w-10/12 gap-y-8 w-full sm:flex-nowrap text-center sm:text-justify flex-wrap flex justify-center sm:justify-around"
      >
        <router-link
          v-if="!loginStatus"
          to="/sample-quiz"
          class="sm:text-sm sm:w-auto w-full links lg:text-lg md:text-base tracking-wide border-b-none rounded-b-sm sm:px-1 hover:border-b-2 border-white py-3 font-medium"
          >Sample Quiz</router-link
        >
        <router-link
          to="/sample-result"
          class="sm:text-sm sm:w-auto w-full links lg:text-lg md:text-base tracking-wide border-b-none rounded-b-sm sm:px-1 hover:border-b-2 border-white py-3 font-medium"
          >Results</router-link
        >
        <router-link
          to="/login/none/none"
          v-if="!loginStatus"
          class="sm:text-sm sm:w-auto w-full links lg:text-lg md:text-base tracking-wide border-b-none rounded-b-sm sm:px-1 hover:border-b-2 border-white py-3 font-medium"
          >Login</router-link
        >
        <router-link
          to="/"
          @click="logout"
          v-else
          class="sm:text-sm sm:w-auto w-full links lg:text-lg md:text-base tracking-wide border-b-none rounded-b-sm sm:px-1 hover:border-b-2 border-white py-3 font-medium"
          >Logout</router-link
        >
      </div>
      <div
        class="flex items-center justify-center w-full sm:w-1/6 sm:py-0 py-2"
      >
        <input
          @click="$emit('toggle-dark-mode')"
          class="sliding-check w-14 md:w-1/2 xl:w-14 lg:w-2/5 cursor-pointer my-0 md:h-5 h-6 lg:h-6"
          type="checkbox"
          :checked="isDarkModeOn"
          id="dark-mode-btn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HamBurgerIcon from "../assets/icons/HamBurgerIcon.vue";
import CloseIcon from "../assets/icons/CloseIcon.vue";
import LoadingImage from "../assets/icons/LoadingImage.vue";
import { getAuth, signOut } from "../utilities/firebase";
import { mapState } from "pinia";
import { useAuthStore } from "../store/auth";
import { useNavbarStore } from "../store/navbar-store";
import { useUniversalStore } from "../store/universal";
export default {
  components: { HamBurgerIcon, CloseIcon, LoadingImage },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    },
    showMenu() {
      let details = document.documentElement.getBoundingClientRect();
      if (details.width < 640) {
        let appHeader = this.$refs.AppHeader;
        appHeader.style.height = "auto";
        appHeader.style.background = "white";
        appHeader.style.color = "black";
        this.$refs.menu.style.width = "100%";
        this.isMenuShowing = true;
      }
    },
    hideMenu() {
      let details = document.documentElement.getBoundingClientRect();
      if (details.width < 640) {
        let appHeader = this.$refs.AppHeader;
        appHeader.style.height = "2.5rem";
        appHeader.style.background = "transparent";
        appHeader.style.color = "white";
        this.$refs.menu.style.width = "0";
        this.isMenuShowing = false;
      }
    },
  },
  created() {
    // Used the created lifecycle method here because mounted doesn't update state quick enough
    const store = useUniversalStore();
    this.isDarkModeOn = store.darkModeStatus;
  },
  mounted() {
    window.addEventListener("resize", () => {
      let details = document.documentElement.getBoundingClientRect();
      if (details.width > 640) {
        let appHeader = this.$refs.AppHeader;
        if (appHeader) {
          appHeader.style.height = "auto";
          this.$refs.menu.style.width = "100%";
        }
      } else {
        // To prevent opening of menu without user click on resize
        details.top && this.isMenuShowing < -100
          ? this.showMenu()
          : this.hideMenu();
      }
    });
    const store = useNavbarStore();
    if (!store.listenerStatus) {
    }
    window.addEventListener("scroll", (e) => {
      const windowView = document.documentElement.getBoundingClientRect();
      if (windowView.width < 640) return;
      else if (windowView.top < -100 && windowView.width > 640) {
        if (this.$refs.AppHeader && this.$refs.quizIcon) {
          this.$refs.AppHeader.style.color = "black";
          this.$refs.AppHeader.style.background = "white";
        }
      } else {
        if (
          this.$refs.AppHeader &&
          this.$refs.quizIcon &&
          windowView.width > 640
        ) {
          this.$refs.AppHeader.style.color = "white";
          this.$refs.AppHeader.style.background = "transparent";
        }
      }
    });
  },
  unmounted() {
    window.removeEventListener("scroll", this.scrollFunction);
  },
  data() {
    return {
      isMenuShowing: false,
      isDarkModeOn: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["loginStatus"]),
  },
};
</script>
<style>
.app-header {
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
.links {
  transition: all 0.1s;
}
.sliding-check {
  -webkit-appearance: none;
  background: #c6c6c6;
  position: relative;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  padding: 5px;
}
.sliding-check:checked {
  background: skyblue;
}
.sliding-check::before {
  content: "";
  position: absolute;
  width: 45%;
  height: 100%;
  border-radius: 9999px;
  top: 0px;
  left: 0;
  transform: scale(1.1);
  border: 1px solid #3333337c;
  background: white;
  transition: all 0.5s;
}
.sliding-check:checked:before {
  left: 60%;
}
</style>
