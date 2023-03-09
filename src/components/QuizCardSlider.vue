<template>
  <section class="my-10 relative">
    <h1
      id="card-content"
      ref="cardContent"
      class="text-2xl md:text-3xl lg:text-5xl font-semibold text-center"
      >Our Quiz</h1
    >
    <div class="absolute z-30 flex justify-between top-52 w-full">
      <span
        style="transition: all 0.5s"
        :class="isScrolled ? 'opacity-100' : 'opacity-0'"
        class="text-4xl hover:text-blue-500 lg:scale-100 scale-90 bg-white p-3 rounded-full text-black"
        @click="scrollLeft"
      >
        <Btn :icon="'left'"></Btn>
      </span>
      <span
        style="transition: all 0.5s"
        :class="!isScrolledRightEnd ? 'opacity-100' : 'opacity-0'"
        class="bg-white p-3 hover:text-blue-500 lg:scale-100 scale-90 rounded-full text-black"
        @click="scrollRight"
      >
        <Btn :icon="'right'"></Btn>
      </span>
    </div>
    <div
      @wheel="preventHorizontalScroll"
      class="grid mt-5 grid-flow-col pl-5 lg:pl-36 scroll-smooth z-0 gap-x-3 relative quiz-card-container overflow-x-auto py-4"
      ref="quizCardContainer"
    >
      <div
        @click="selectQuiz(index)"
        v-for="(item, index) in quizImages.length"
        :key="item"
        class="lg:h-96 lg:w-72 md:h-60 md:w-44 h-64 w-48 overflow-hidden bg-black shadow-md flex-wrap flex quiz-card"
        id="quiz-card"
      >
        <div class="w-full h-3/4">
          <img
            class="h-full w-full"
            :src="getImageUrl(quizImages[index])"
            alt=""
          />
        </div>
        <div class="bg-white px-5 flex flex-wrap w-full h-1/4">
          <div class="w-full mt-1 flex justify-between">
            <p class="text-xs text-black sm:block hidden">{{
              getCurrentDate
            }}</p>
            <p class="text-xs text-blue-800">{{ getCountry }}</p>
          </div>
          <div class="w-full text-black">
            <h1 class="font-normal sm:w-full text-xs lg:text-sm">{{
              quizInfo[index]
            }}</h1>
          </div>
        </div>
      </div>
      <div class="bg-transparent w-full h-full" ref="endScroll"></div>
    </div>
    <Teleport to="body">
      <QuizModal v-if="quizSelected">
        <template #header>
          <button
            @click="this.quizSelected = false"
            class="w-full my-2 hover:bg-blue-900 transition-all bg-blue-800 px-3 text-gray-200 rounded-md py-2 font-semibold text-xs uppercase tracking-wider cursor-pointer"
            >Go Back</button
          >
          <h1 class="my-2"
            >You've selected the
            <span class="capitalize font-semibold">{{ category }}</span>
            Quiz</h1
          >
          <h1 class="my-2 font-semibold"
            >Select Your Difficulty Level Below:</h1
          >
        </template>

        <template #main>
          <div>
            <div class="flex gap-2 items-center">
              <input
                v-model="difficulty"
                type="radio"
                class="h-3 w-3"
                name="difficulty-level"
                value="easy"
                id=""
              />
              <label class="font-bold">Easy</label>
            </div>
            <div class="flex gap-2 items-center">
              <input
                v-model="difficulty"
                type="radio"
                class="h-3 w-3"
                name="difficulty-level"
                value="medium"
                id=""
              />
              <label class="font-bold">Medium</label>
            </div>
            <div class="flex gap-2 items-center">
              <input
                v-model="difficulty"
                type="radio"
                class="h-3 w-3"
                name="difficulty-level"
                value="hard"
                id=""
              />
              <label class="font-bold">Hard</label>
            </div>
          </div>
        </template>

        <template #footer>
          <button
            v-if="!isLoading"
            @click="startQuiz"
            class="w-full my-2 hover:bg-blue-800 transition-all bg-blue-900 px-3 text-gray-200 rounded-md py-2 font-semibold text-xs uppercase tracking-wider cursor-pointer"
            >Go to Quiz</button
          >
          <LoadingIcon v-else />
        </template>
      </QuizModal>
    </Teleport>
    <div class="my-4 pr-2 w-10/12 flex justify-end">
      <div class="">
        <Btn
          @click="showAllQuiz"
          class="all-quiz-btn"
          :direction="'right-long'"
          :icon="'btn'"
          >View All Quizzes</Btn
        >
      </div>
    </div>
  </section>
</template>
<script>
import Btn from "../components/Btn.vue";
import getImageUrl from "../utilities/mixins/getImageUrl";
import QuizModal from "../components/Modal.vue";
import changeRoute from "../utilities/mixins/changeRoute";
import getCountry from "../utilities/mixins/getCountry";
import { useUniversalStore } from "../store/universal";
import { useAuthStore } from "../store/auth";
import LoadingIcon from "../assets/icons/LoadingIcon.vue";
export default {
  components: { Btn, QuizModal, LoadingIcon },
  mixins: [getImageUrl, changeRoute, getCountry],
  props: {
    quizImages: Array,
  },
  data() {
    return {
      isScrolled: false, // state to trigger hide or shoe of left arrow icon
      categories: [
        "arts",
        "sports",
        "music",
        "history",
        "movies",
        "general_knowledge",
        "science",
      ],
      quizInfo: [
        "This quiz is based on arts",
        "Test your knowledge on different sports",
        "How much do you know music,  Click to Find out",
        "Test your info on history",
        "Like Movies? Check out some of your best movies",
        "Want to know more on general topics? Click here",
        "Science Geek? Find out more by clicking",
      ],
      difficulty: "",
      quizSelected: false,
      category: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      currentDate: "",
      isScrolledRightEnd: false, // state to trigger display of right icon
      isLoading: false,
    };
  },
  computed: {
    getCurrentDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1); //January is 0!
      var yyyy = today.getFullYear();
      return `${dd} ${this.months[mm]} ${yyyy}`;
    },
  },
  methods: {
    scrollRight() {
      let quizCardContainer = this.$refs.quizCardContainer;
      let endScroll = this.$refs.endScroll;
      quizCardContainer.scrollLeft += 500;
      !this.isScrolled ? (this.isScrolled = true) : "";
      quizCardContainer.scrollLeft > endScroll.getBoundingClientRect().left
        ? (this.isScrolledRightEnd = true)
        : "";
    },
    scrollLeft() {
      let quizCardContainer = this.$refs.quizCardContainer;
      quizCardContainer.scrollLeft -= 500;
      quizCardContainer.scrollLeft <= 500 ? (this.isScrolled = false) : "";
      this.isScrolledRightEnd = false;
    },
    selectQuiz(index) {
      this.quizSelected = true;
      this.category = this.categories[index];
    },
    startQuiz() {
      let store = useAuthStore();
      if (!store.isLoggedIn) {
        this.changeRoute("login", {
          category: this.category,
          difficulty: this.difficulty,
        });
      } else {
        this.changeRoute("quiz", {
          category: this.category,
          difficulty: this.difficulty,
        });
        this.isLoading = true;
      }
    },
    preventHorizontalScroll(e) {
      e.preventDefault();
      let quizCardContainer = this.$refs.quizCardContainer;
      quizCardContainer.scrollTop += e.deltaY;
    },
    showAllQuiz() {
      this.changeRoute("allQuiz", {});
    },
  },
  mounted() {
    const store = useUniversalStore();
    if (store.darkModeStatus) {
      const cardContent = document.getElementById("card-content");
      cardContent ? (cardContent.style.color = "#ccc") : "";
      const cards = [...document.querySelectorAll("#quiz-card")];
      if (cards.length > 1) {
        cards.map((card) => {
          card.style.border = "1px solid #aaa";
        });
      }
      const label = document.getElementById("label");
      console.log(label);
      label ? (label.style.color = "#bbb") : "";
    } else {
      const cardContent = document.getElementById("card-content");
      cardContent ? (cardContent.style.color = "#000") : "";
      const cards = [...document.querySelectorAll(".quiz-card")];
      if (cards.length > 1) {
        cards.map((card) => {
          card.style.border = "none";
        });
      }
      const label = document.getElementById("label");
      label ? (label.style.color = "#000") : "";
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isLoading = false;
    next();
  },
};
</script>
<style>
@media (max-width: 640px) {
  .all-quiz-btn {
    font-size: 14px !important;
    padding-inline: 0.6rem !important;
    padding-block: 0.4rem !important;
  }
}
@media (max-width: 840px) {
  .all-quiz-btn {
    font-size: 16px !important;
    padding-inline: 0.6rem !important;
    padding-block: 0.4rem !important;
  }
}
</style>
