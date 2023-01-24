<template>
<div class="flex flex-wrap wrapping-container justify-center items-center">
    <div class="m-2 bg-white border-2 xl:py-5 lg:py-3 md:py-4 py-5 xl:w-1/3 lg:w-1/2  md:w-3/5 w-11/12 rounded-lg px-3 sm:px-5">
        <h1 class="w-full text-center font-bold capitalize sm:text-3xl text-xl mb-3" v-if="!userSignUp">login</h1>
        <h1 class="w-full text-center font-bold capitalize sm:text-3xl text-xl mb-3" v-else>Sign Up</h1>
        <p class="w-full text-center text-xs sm:text-sm opacity-50 mb-4">Enter your credentials here</p>
        <form action="/" class="w-full">
            <span class="inline-flex w-full">
                <label for="" class="z-50 absolute ml-2 text-xs text-gray-400">Email</label>
                <input type="text" class="border-2 border-t-transparent relative text-sm w-full outline-none py-2 pl-2 my-2 rounded-sm" ref="username" v-model="email"/>
            </span>
            <span class="inline-flex w-full">
                <label for="" class="z-50 absolute ml-2 text-xs text-gray-400">Password</label>
                <input type="password" class="border-2 relative text-sm w-full outline-none py-2 pl-2 my-2 rounded-sm border-t-transparent" v-model="password"/>
            </span>
            <p class="text-blue-700 pl-1  text-xs my-3 cursor-pointer" v-if="!userSignUp">Forgot your password?</p>
            <p @click="userSignUp = !userSignUp" class="text-blue-600  pl-1 text-xs my-3" v-if="!userSignUp">Don't have an account? <a class="text-inherit no-underline">Sign Up</a></p>
            <p @click="userSignUp = !userSignUp"  class="text-blue-600  pl-1 text-xs my-3" v-else>Have an account? <a class="text-inherit no-underline">Login</a></p>
            <button
                class="w-full my-2 bg-blue-900 text-gray-200 rounded-md py-2 font-semibold text-xs sm:text-sm uppercase tracking-wider cursor-pointer" v-if="!userSignUp" @click="login">login</button>
            <button
                class="w-full my-2 bg-blue-900 text-gray-200 rounded-md py-2 font-semibold text-xs sm:text-sm uppercase tracking-wider cursor-pointer" v-else @click="signUp">Sign Up</button>
        </form>
    </div>
</div>
</template>

<script>
import firebase from "../utilities/firebase"
export default {
    data(){
        return{
            email:"",
            password : "",
            userSignUp : false
        }
    },
    mounted(){
        this.$refs.username.focus()
    },
   methods:{
        login(){
           const auth = firebase.getAuth();
           firebase.signInWithEmailAndPassword(auth, this.email, this.password)
               .then((userCredential) => {
                   // Signed in 
                   const user = userCredential.user;
                   if(user){
                       this.email=this.password = ""
                   }
                   console.log(user)
                   // ...
               })
               .catch((error) => {
                   const errorCode = error.code;
                   const errorMessage = error.message;
               });
        },
        signUp(){
            const auth = firebase.getAuth();
            firebase.createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    if (user) {
                        this.email = this.password = ""
                    }
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    }
}
</script>

<style>
.wrapping-container {
    background: url("../assets/images/low-poly-grid-haikei.svg");
    height:auto;
    background-repeat: no-repeat;
    background-size: cover;
    animation: pan 6s infinite alternate linear;
}

@keyframes pan {
    100% {
        background-position: 15% 50%;
    }
}
@media (min-width:1024px) {
    .wrapping-container {height:calc(100vh - 66px);}
}
</style>