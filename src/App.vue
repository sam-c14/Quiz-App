<template>
  <AppHeaderVue @toggle-dark-mode="toggleDarkMode" class="fixed" />
  <router-view></router-view>
  <FooterComp />
</template>

<script>
import AppHeaderVue from "./components/AppHeader.vue";
import FooterComp from "./components/Footer.vue";
import { getAuth, onAuthStateChanged } from "./utilities/firebase";
import { useAuthStore } from "./store/auth";
import { useUniversalStore } from "./store/universal";
export default {
  components: { AppHeaderVue, FooterComp },
  created() {
    if (localStorage.getItem("universalStore")) {
      const state = JSON.parse(localStorage.getItem("universalStore"));
      const store = useUniversalStore();
      store.$state = state;
      this.toggleDarkMode(!store.darkModeStatus);
    }
  },
  mounted() {
    const auth = getAuth();
    const store = useAuthStore();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        store.setLoginStatus(true);
        // ...
      } else {
        // User is signed out
        // ...
        store.setLoginStatus(false);
      }
    });
  },
  methods: {
    toggleDarkMode(prev = "") {
      let store = useUniversalStore();
      if (prev === "") prev = store.darkModeStatus;
      store.setDarkModeStatus(!prev);
      if (store.darkModeStatus) {
        document.documentElement.style.transition = "background .2s";
        document.documentElement.style.backgroundColor = "#222";
        const cardContent = document.getElementById("card-content");
        cardContent ? (cardContent.style.color = "#fff") : "";
        const cards = [...document.querySelectorAll("#quiz-card")];

        if (cards.length > 1) {
          cards.map((card) => {
            card.style.border = "1px solid #aaa";
          });
        }
        const labels = [...document.getElementsByTagName("label")];
        if (labels.length > 1) {
          labels.map((label) => {
            label.style.color = " #bbb";
          });
        }
        const aboutTags = [...document.getElementsByClassName("p-about")];
        if (aboutTags.length > 1) {
          aboutTags.map((tag) => {
            tag.style.color = " #bbb";
          });
        }
        const label = document.getElementById("label");
        label ? (label.style.color = "#bbb") : "";
      } else {
        document.documentElement.style.backgroundColor = "#fff";
        const cardContent = document.getElementById("card-content");
        cardContent ? (cardContent.style.color = "#000") : "";
        const cards = [...document.querySelectorAll(".quiz-card")];
        if (cards.length > 1) {
          cards.map((card) => {
            card.style.border = "none";
          });
        }
        const labels = [...document.getElementsByTagName("label")];
        if (labels.length > 1) {
          labels.map((label) => {
            label.style.color = " #000";
          });
        }
        const aboutTags = [...document.getElementsByClassName("p-about")];
        if (aboutTags.length > 1) {
          aboutTags.map((tag) => {
            tag.style.color = " #000";
          });
        }
        const label = document.getElementById("label");
        label ? (label.style.color = "#000") : "";
      }
      localStorage.setItem("universalStore", JSON.stringify(store.$state));
    },
  },
};
</script>
