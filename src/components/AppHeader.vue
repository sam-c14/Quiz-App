<template>
  <div class="bg-gray-50">
    <div class="flex py-3 pl-2 w-11/12 justify-between">
        <router-link to="/" class="text-sm font-bold">QuizGame</router-link>
        <div class="w-10/12 flex justify-around">
            <router-link to="/quiz" class="text-sm tracking-wide font-serif font-medium">Quiz</router-link>
            <!-- <router-link to="/result/:id" class="text-sm tracking-wide font-serif font-medium">Results</router-link> -->
            <router-link to="/login" v-if="!isLoggedIn" class="text-sm tracking-wide font-serif font-medium">Login</router-link>
            <router-link to="/" @click="logout" v-else class="text-sm tracking-wide font-serif font-medium">Logout</router-link>
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

}
</script>
