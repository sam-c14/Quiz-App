<template> 
<div id="home-container">
    <Banner :heroInfo="heroInfo" :count="count" />
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
import Btn from "../components/Btn.vue"
import FooterComp from "../components/Footer.vue"
import getImageUrl from "../utilities/mixins/getImageUrl"
import QuizCardSlider from "../components/QuizCardSlider.vue"
import AboutQuiz from "../components/AboutQuiz.vue"
import AsideComp from "../components/AsideComp.vue"
import Banner from "../components/Banner.vue"
export default {
  components : {Banner,Btn,FooterComp,QuizCardSlider,AboutQuiz,AsideComp},
  mixins: [getImageUrl],
  data(){
    return{
      interval:"",
      count : 0,
      asideImgCount : 0,
      quizImages : ["Art_Quiz_5.jpg","Golf_Quiz.jpg","History_Quiz_2.jpg","History_Quiz.jpg","Movie_Quiz_4.jpg","OIP.jpg","Science_Quiz_2.jpg"],
      heroInfo: [
        {
          header: "Check out the Available quizzes for you to play",
          btnContent: "View Quiz"
        },
        {
          header: "Learn more about our Quiz, Read Now!!!",
          btnContent: " About Section"
        },
        {
          header: "Configure Your Quizzes",
          btnContent: "Go to Quiz Section"
        },
      ],
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