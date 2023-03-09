<template>
  <div id="home-container">
    <Banner
      @change-img="changeBackground"
      :heroInfo="heroInfo"
      :count="count"
    />
    <div class="flex z-20 bg-black relative w-full">
      <span
        style="left: 50%; transition: all 0.5s"
        class="text-3xl cursor-pointer bg-gray-200 border absolute -bottom-5 border-gray-300 shadow-lg p-3 hover:text-blue-500 rounded-full text-black"
      >
        <a @click="scrollDown"><Btn></Btn></a>
      </span>
    </div>
    <QuizCardSlider :quizImages="quizImages" />
    <AboutQuiz :quizImages="quizImages" :asideImgCount="asideImgCount" />
    <AsideComp />
  </div>
</template>

<script>
import Btn from "../components/Btn.vue";
import getImageUrl from "../utilities/mixins/getImageUrl";
import QuizCardSlider from "../components/QuizCardSlider.vue";
import AboutQuiz from "../components/AboutQuiz.vue";
import AsideComp from "../components/AsideComp.vue";
import Banner from "../components/Banner.vue";
export default {
  components: { Banner, Btn, QuizCardSlider, AboutQuiz, AsideComp },
  mixins: [getImageUrl],
  data() {
    return {
      interval: "",
      count: 0,
      asideImgCount: 0,
      quizImages: [
        "Art_Quiz_5.jpg",
        "Golf_Quiz.jpg",
        "History_Quiz_2.jpg",
        "History_Quiz.jpg",
        "Movie_Quiz_4.jpg",
        "OIP.jpg",
        "Science_Quiz_2.jpg",
      ],
      heroInfo: [
        {
          header: "Check out the Available quizzes for you to play",
          btnContent: "View Quiz",
        },
        {
          header: "Learn more about our Quiz, Read Now!!!",
          btnContent: "About Section",
        },
        {
          header: "Know more about the developer",
          btnContent: "Go to Contact Section",
        },
      ],
    };
  },
  computed: {},
  methods: {
    changeBackground(num) {
      this.count = num;
    },
    scrollDown() {
      document.documentElement.style.scrollBehavior = "smooth";
      window.scrollTo(0, 730);
      document.documentElement.style.scrollBehavior = "auto";
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.count == 2) this.count = 0;
      else this.count++;
      this.asideImgCount == this.quizImages.length - 1
        ? (this.asideImgCount = 0)
        : this.asideImgCount++;
    }, 10000);
  },
  unmounted() {
    this.interval = "";
  },
  beforeRouteEnter(to, __, next) {
    window.scrollTo(0, 0);
    next();
  },
};
</script>

<style>
body {
  scroll-behavior: smooth;
}
.quiz-card {
  transition: all 0.4s;
}
.quiz-card:hover {
  transform: scale(1.05);
}
.quiz-card-container::-webkit-scrollbar {
  height: 0px;
}
::-webkit-scrollbar-thumb {
  border: 0.25em solid inherit;
  background: gray;
  border-radius: 100vw;
}
::-webkit-scrollbar {
  width: 1.2em;
}
::-webkit-scrollbar-track {
  margin-block: 0.5em;
}
.btn {
  transition: all 0.5s;
}
</style>
