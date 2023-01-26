<template> 
    <div style="height: 90vh;" class="relative flex justify-center scroll-smooth no-scroll">
      <div class="w-full flex flex-wrap absolute h-full" v-for="(classes,index) in imgClasses" :key="classes" >
        <Transition name="fade">
          <div class="w-full h-full" :class="classes" v-if="index == count">
              <div class="flex h-full justify-end flex-wrap w-2/3 items-center">
                <div>
                  <h1 class="text-white text-2xl font-semibold my-1">Check Out Different Quizzes and pick one that suits you</h1>
                  <button class="p-2 rounded-full text-blue-500 bg-white my-1">View Available Quiz   <span class="ml-1">&#9658;</span></button>
                </div>
              </div>
          </div>
        </Transition>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      interval:"",
      count : 0,
      imgClasses : ["image-1","image-2","image-3"]
    }
  },
  methods : {
     getImageUrl(imageUrl) {
      // This path must be correct for your file
      return new URL(`../assets/images/${imageUrl}`, import.meta.url)
    },
  },
  mounted(){
    this.interval=setInterval(()=>{  
      if (this.count == 2) this.count = 0 
      else this.count++
    },7000)
  },
  unmounted(){
    this.interval = ''
  }
}
</script>

<style>
.image-1{
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),url("../assets/images/pexels-ivan-samkov-4240497.jpg") no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

}
.image-2{
  background:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("../assets/images/pexels-jakub-novacek-924824.jpg") no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
.image-3{
  background:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("../assets/images/pexels-lil-artsy-1394646.jpg") no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.no-scroll{
  overflow: hidden;
}
body{
  scroll-behavior: smooth;
}
</style>