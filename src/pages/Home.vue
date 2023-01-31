<template> 
<div id="home-container">
    <div style="height: 90vh;" class="relative flex justify-center scroll-smooth no-scroll">
      <div class="w-full flex flex-wrap absolute h-full" v-for="(classes,index) in imgClasses" :key="classes" >
        <Transition name="fade">
          <div class="w-full h-full" :class="classes" v-if="index == count">
              <div class="flex h-full pl-2 w-full sm:w-3/5 sm:pl-1 justify-end flex-wrap items-center">
                <HeroContent class="z-30 w-auto">
                  <template #header>
                    <h1 class="text-white text-xl sm:text-2xl font-semibold my-1">{{heroInfo[index].header}}</h1>
                  </template>
                  
                  <template #btn-slot>
                    <button class="p-3 py-2 w-10/12 sm:w-auto text-xs sm:text-sm hover:bg-blue-500 btn hover:text-white font-normal tracking-wider rounded-full text-blue-600 bg-white my-1">
                      {{heroInfo[index].btnContent}}<span class="ml-1">
                        <Btn :icon="'right-long'"></Btn>
                      </span>
                    </button>
                  </template>
                </HeroContent>
              </div>
          </div>
        </Transition>
      </div>
      <div class="pb-3 z-10 flex items-end justify-end w-10/12">
        <Pagination class="" :arr="imgClasses" :count="count + 1" :counter="1" />
      </div>
    </div>
    <div class="flex z-20 bg-black relative w-full">
      <span style="left: 50%;" class="text-3xl cursor-pointer bg-gray-200 border absolute -bottom-5 border-gray-300 shadow-lg p-3 rounded-full text-black">
        <a href="#card-content"><Btn></Btn></a>
      </span>
    </div>
    <QuizCardSlider :quizImages="quizImages" />
    <AboutQuiz :quizImages="quizImages" :asideImgCount="asideImgCount" />
    <AsideComp />
  <FooterComp />
</div>
</template>

<script>
import HeroContent from "../components/HeroContent.vue"
import Pagination from "../components/Pagination.vue"
import Btn from "../components/Btn.vue"
import FooterComp from "../components/Footer.vue"
import getImageUrl from "../utilities/mixins/getImageUrl"
import QuizCardSlider from "../components/QuizCardSlider.vue"
import AboutQuiz from "../components/AboutQuiz.vue"
import AsideComp from "../components/AsideComp.vue"
export default {
  components : {HeroContent,Pagination,Btn,FooterComp,QuizCardSlider,AboutQuiz,AsideComp},
  mixins: [getImageUrl],
  data(){
    return{
      interval:"",
      count : 0,
      asideImgCount : 0,
      heroInfo:[
        {
          header : "Check out the Available quizzes for you to play",
          btnContent : "View Quiz"
        }, 
        {
          header : "Learn more about our Quiz, Read Now!!!",
          btnContent : " About Section"
        }, 
        {
          header : "Configure Your Quizzes",
          btnContent : "Go to Quiz Section"
        }, 
      ],
      imgClasses : ["image-1","image-2","image-3"],
      quizImages : ["Art_Quiz_5.jpg","Golf_Quiz.jpg","History_Quiz_2.jpg","History_Quiz.jpg","Movie_Quiz_4.jpg","OIP.jpg","Science_Quiz.jpg"]
    }
  },
  computed : {},
  mounted(){
    this.interval=setInterval(()=>{  
      if (this.count == 2) this.count = 0 
      else this.count++
      this.asideImgCount == this.quizImages.length -1 ? this.asideImgCount = 0 : this.asideImgCount++
    },10000)
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
.quiz-card{
  transition: all .4s;
}
.quiz-card:hover{
  transform: scale(1.05);
}
.quiz-card-container::-webkit-scrollbar{
  height: 0px;
}
::-webkit-scrollbar-thumb{
  border: .25em solid white;
  background: gray;
  border-radius: 100vw;
}
::-webkit-scrollbar{
  width: 1.2em;
}
::-webkit-scrollbar-track{
  margin-block: .5em;
}
.btn{
  transition: all .5s;
}
</style>