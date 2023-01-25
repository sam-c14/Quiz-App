<template>
  <div>
    <div class="w-full flex justify-center ">
      <div v-for="(classes,index) in imgClasses" :key="classes" style="height: 90%;width: 99.7%;"  class="absolute">
        <Transition name="slide-fade">
          <div v-if="index == count" :class="classes" class="absolute w-full h-full">
          
          </div>
        </Transition>
      </div>
    </div>
  </div>
  <!-- <div class="h-screen">
    heyy
  </div> -->
</template>

<script>
export default {
  data(){
    return{
      interval:"",
      count : 0,
      imgUrl: ["pexels-jakub-novacek-924824.jpg", "pexels-ivan-samkov-4240497.jpg","pexels-lil-artsy-1394646.jpg"],
      imgClasses : ["image-1","image-2","image-3"]
    }
  },
  methods : {
     getImageUrl(imageUrl) {
      // This path must be correct for your file
      return new URL(`../assets/images/${imageUrl}`, import.meta.url)
}
  },
  mounted(){
    // this.interval=setInterval(()=>{
    //   this.count == 2 ? this.count = 0 : this.count++
    // },2000)
    
  },
  unmounted(){
    this.interval = ''
  }
}
</script>

<style>
.image-1{
  background: url("../assets/images/pexels-ivan-samkov-4240497.jpg") no-repeat;
  background-position: center;
  background-size: cover;
}
.image-2{
  background: url("../assets/images/pexels-jakub-novacek-924824.jpg") no-repeat;
  background-position: center;
  background-size: cover;
}
.image-3{
  background: url("../assets/images/pexels-lil-artsy-1394646.jpg") no-repeat;
  background-position: center;
  background-size: cover;
}
.slide-fade-enter-active {
  transition: opacity,transform 0.5s ease;
}

.slide-fade-leave-active {
  transition: opacity,transform 0.5s ease;
}

.slide-fade-enter-from{
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-leave-to {display: none;
  transform: translateX(100%);
  opacity: 0;
}
</style>