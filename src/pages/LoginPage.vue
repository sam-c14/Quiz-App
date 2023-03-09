<template>
  <div
    class="flex mb-2 flex-wrap wrapping-container justify-center items-center"
  >
    <div
      class="m-2 bg-white border-2 xl:py-5 lg:py-3 md:py-4 py-5 xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 rounded-md px-3 sm:px-5"
    >
      <h1
        class="w-full text-center font-bold capitalize sm:text-3xl text-xl mb-3"
        v-if="!userSignUp"
        >login</h1
      >
      <h1
        class="w-full text-center font-bold capitalize sm:text-3xl text-xl mb-3"
        v-else
        >Sign Up</h1
      >
      <p class="w-full text-center text-xs sm:text-sm opacity-50 mb-4"
        >Enter your credentials here</p
      >
      <form @submit.prevent class="w-full">
        <span class="inline-flex w-full">
          <label for="" class="z-50 absolute ml-2 text-xs text-gray-400"
            >Email</label
          >
          <input
            type="text"
            class="border-2 border-t-transparent relative text-sm w-full outline-none py-2 pl-2 my-2 rounded-sm"
            ref="username"
            v-model="email"
          />
        </span>
        <span class="inline-flex w-full">
          <label for="" class="z-50 absolute ml-2 text-xs text-gray-400"
            >Password</label
          >
          <input
            type="password"
            class="border-2 relative text-sm w-full outline-none py-2 pl-2 my-2 rounded-sm border-t-transparent"
            v-model="password"
          />
        </span>
        <p
          class="text-blue-700 pl-1 text-xs my-3 cursor-pointer"
          v-if="!userSignUp"
          >Forgot your password?</p
        >
        <p
          @click="setSignUpStatus"
          class="text-blue-600 pl-1 text-xs my-3"
          v-if="!userSignUp"
          >Don't have an account?
          <a class="text-inherit no-underline">Sign Up</a></p
        >
        <p
          @click="setSignUpStatus"
          class="text-blue-600 pl-1 text-xs my-3"
          v-else
          >Have an account? <a class="text-inherit no-underline">Login</a></p
        >
        <button
          class="w-full my-2 bg-blue-900 btn-transition hover:bg-blue-700 text-gray-200 rounded-md py-2 font-semibold text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
          v-if="!userSignUp"
          @click="login"
          >login</button
        >
        <button
          class="w-full my-2 bg-blue-900 btn-transition hover:bg-blue-700 text-gray-200 rounded-md py-2 font-semibold text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
          v-else
          @click="signUp"
          >Sign Up</button
        >
      </form>
    </div>
  </div>
</template>

<script>
import changeRoute from "../utilities/mixins/changeRoute";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../utilities/firebase";
export default {
  mixins: [changeRoute],
  data() {
    return {
      email: "",
      password: "",
      userSignUp: false,
    };
  },
  mounted() {
    this.$refs.username.focus();
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user) {
            this.email = this.password = "";
          }
          if (
            this.$route.params.category !== "none" &&
            this.$route.params.difficulty !== "none"
          ) {
            this.changeRoute("quiz", {
              category: this.$route.params.category,
              difficulty: this.$route.params.difficulty,
            });
          } else this.changeRoute("home", {});
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    signUp() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in

          const user = userCredential.user;
          if (user) {
            this.email = this.password = "";
          }

          if (
            this.$route.params.category !== "none" &&
            this.$route.params.difficulty !== "none"
          ) {
            this.changeRoute("quiz", {
              category: this.$route.params.category,
              difficulty: this.$route.params.difficulty,
            });
          } else this.changeRoute("home", {});
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          // ..
        });
    },
    setSignUpStatus() {
      this.userSignUp = !this.userSignUp;
      this.email = this.password = "";
    },
  },
};
</script>

<style>
.wrapping-container {
  background: url("../assets/images/low-poly-grid-haikei.svg");
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  animation: pan 6s infinite alternate linear;
}
.btn-transition {
  transition: all 0.2s;
}
@keyframes pan {
  100% {
    background-position: 15% 50%;
  }
}
@media (min-width: 640px) {
  .wrapping-container {
    height: 100vh;
  }
}
@media (max-width: 640px) {
  .wrapping-container {
    height: 80vh;
  }
}
</style>
