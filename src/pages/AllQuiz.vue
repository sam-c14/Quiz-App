<template>
  <div :class="!isLoading ? 'opacity-100' : 'opacity-5'" class="hide-show">
    <Banner
      @change-img="changeBackground"
      :heroInfo="heroInfo"
      :count="count"
    />

    <div class="w-full flex-wrap flex my-5">
      <div class="flex h-1/6 mb-5 w-10/12 justify-end">
        <div class="w-full flex flex-wrap justify-end">
          <div class="w-10/12 py-2 mr-4 text-end">
            <label for="search-quiz" id="card-content">Filter By Course</label>
          </div>
          <div class="xl:w-1/5 lg:w-1/4 md:w-1/3 relative">
            <div class="inline-flex w-full">
              <input
                id="search-quiz"
                @click="isListShowing = !isListShowing"
                autocomplete="off"
                type="text"
                v-model="search"
                name="search-quiz"
                class="border border-black rounded-sm w-full uppercase font-normal text-sm bg-slate-200 py-1 pl-2"
              />
              <AngleArrowDown class="relative -left-4 top-1.5" />
            </div>
            <div
              v-if="isListShowing"
              class="absolute z-20 py-1 right-1 shadow border top-1 backdrop-blur bg-transparent w-full"
            >
              <div
                class="pl-3 hover:bg-blue-500 hover:text-white transition-all font-medium uppercase pb-1 pt-1 text-sm"
                @click="searchItem"
                :data-id="item"
                v-for="item in options"
                :key="item"
                >{{ item }}</div
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center flex-wrap w-full">
        <div
          v-for="(item, index) in tempQuizImagesArray.length"
          :key="item"
          @click="selectQuiz(index)"
          :class="index % 2 == 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          class="md:h-64 border w-4/5 md:w-11/12 xl:w-2/3 flex-col mb-0 hover:shadow-2xl overflow-hidden bg-black flex-nowrap flex quiz-card-2"
          ref="quizCard"
        >
          <div class="w-full h-full">
            <img
              class="h-full w-full"
              :src="getImageUrl(tempQuizImagesArray[index])"
              alt=""
            />
          </div>
          <div class="bg-white flex flex-wrap w-full h-full">
            <div
              class="w-full px-5 mt-1 lg:mt-1 md:mt-5 flex flex-wrap justify-between"
            >
              <p
                class="text-xs font-bold lg:w-auto md:w-full mb-0 md:mb-0.5 lg:mb-0 w-auto text-black sm:block"
              >
                {{ getCurrentDate }}</p
              >
              <p
                class="text-xs font-semibold lg:w-auto md:w-full mb-0 lg:mb-0 w-auto text-blue-800"
                >{{ getCountry }}</p
              >
            </div>
            <div
              class="w-full px-5 h-full pt-5 lg:text-2xl md:text-xl text-black"
            >
              <h1
                v-if="tempQuizImagesArray.length > 2"
                class="font-semibold sm:w-full"
              >
                {{ quizInfo[index] }}
              </h1>
              <h1 v-else class="font-semibold sm:w-full">
                {{ quizInfo[ind] }}
              </h1>
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
                      <span class="capitalize font-semibold">{{
                        category
                      }}</span>
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
              <div
                class="text-blue-700 mt-2 mb-3 h-1/2 flex justify-end items-start"
              >
                <Btn class="quiz-card-2" :icon="'right-long'"></Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <div
      ref="loaderContainer"
      style="z-index: 90"
      class="fixed hide-show top-0 w-full flex justify-center items-center h-screen bg-slate-50"
      v-if="isLoading"
    >
      <LoadingIcon />
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import getImageUrl from "../utilities/mixins/getImageUrl";
import QuizModal from "../components/Modal.vue";
import getCountry from "../utilities/mixins/getCountry";
import Btn from "../components/Btn.vue";
import LoadingIcon from "../assets/icons/LoadingIcon.vue";
import AngleArrowDown from "../assets/icons/AngleArrowDownIcon.vue";
import { useUniversalStore } from "../store/universal";
import { useAuthStore } from "../store/auth";
import changeRoute from "../utilities/mixins/changeRoute";
export default {
  components: { Banner, Btn, LoadingIcon, AngleArrowDown, QuizModal },
  mixins: [getImageUrl, getCountry, changeRoute],
  computed: {
    getCurrentDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1); //January is 0!
      var yyyy = today.getFullYear();
      return `${dd} ${this.months[mm]} ${yyyy}`;
    },
  },
  data() {
    return {
      quizImages: [
        "Art_Quiz_6.jpg",
        "sport_quiz.jpg",
        "Music.quiz.png",
        "History_Quiz.jpg",
        "Movie_Quiz_5.jpg",
        "OIP_2.jpg",
        "Science_Quiz_2.jpg",
      ],
      heroInfo: [
        {
          header: "Check out the Available quizzes for you to play",
          btnContent: "View Quiz",
          route: "/viewAllQuiz",
        },
        {
          header: "Learn more about our Quiz, Read Now!!!",
          btnContent: " About Section",
          route: "/about-quiz",
        },
        {
          header: "Know more about the Developer",
          btnContent: "Go to Contact Section",
          route: "/contact",
        },
      ],
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
      quizInfo: [
        "This quiz is based on arts",
        "Test your knowledge on different sports",
        "How much do you know music,  Click to Find out",
        "Do you truly know the ancients? Click to find out",
        "Check your best movies and try interesting questions",
        "Want to know more on general topics? Click here",
        "How much do you know it Geek? Find out more by clicking",
        "Think you know food cause you're eating it? Lets see how much you really know",
        "Our true science geeks,Test your knowledge on geographic questions",
      ],
      hasBeenMounted: false,
      count: 0,
      isLoading: false,
      difficulty: "",
      quizSelected: false,
      category: "",
      options: [
        "all",
        "arts",
        "sports",
        "music",
        "movies",
        "general_knowledge",
        "science",
        "food",
        "geography",
      ],
      search: "",
      isListShowing: false,
      quizImagesObject: [
        { arts: "Art_Quiz_6.jpg" },
        { sports: "sport_quiz.jpg" },
        { music: "Music.quiz.png" },
        { history: "History_Quiz.jpg" },
        { movies: "Movie_Quiz_5.jpg" },
        { general_knowledge: "OIP_2.jpg" },
        { science: "Science_Quiz_2.jpg" },
        // { food: "Food_Quiz_3.jpg" },
        // { geography: "Geography_Quiz.jpg" },
      ],
      categories: [
        "arts",
        "sports",
        "music",
        "history",
        "movies",
        "general_knowledge",
        "science",
      ],
      tempQuizImagesArray: [],
      ind: 0, // Index to get each quiz Info when search is performed
    };
  },
  beforeMount() {
    this.hasBeenMounted = JSON.parse(localStorage.getItem("hasBeenMounted"));
    if (!this.hasBeenMounted) {
      this.isLoading = true; // Triggers Load Animation
      this.hasBeenMounted = true; // Sets value to true to show that the first mount is complete
      this.loadAnimationEnd(); // Triggers setTimeout to start Animation End
      localStorage.setItem(
        "hasBeenMounted",
        JSON.stringify(this.hasBeenMounted)
      ); // Stores Boolean value to keep track of firstMount
    }
    this.tempQuizImagesArray = this.quizImages;
  },
  mounted() {
    this.$refs.quizCard.map((card) => {
      card.addEventListener("mouseover", () => {
        card.lastElementChild.lastElementChild.lastElementChild.lastElementChild.style.transform =
          "scale(1.2)";
      });
      card.addEventListener("mouseout", () => {
        card.lastElementChild.lastElementChild.lastElementChild.lastElementChild.style.transform =
          "scale(1)";
      });
    });
    const store = useUniversalStore();
    if (store.darkModeStatus) {
      const cardContent = document.getElementById("card-content");
      cardContent ? (cardContent.style.color = "#ccc") : "";
      const cards = [...document.querySelectorAll("#quiz-card")];
      if (cards.length > 1) {
        cards.map((card) => {
          card.style.border = "none";
        });
      }
      const label = document.getElementById("label");
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
    localStorage.clear(); //Allow us to repeat animation after leaving route by clearing localStorage
    next();
  },
  methods: {
    changeBackground(num) {
      this.count = num;
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
    loadAnimationEnd() {
      if (this.isLoading) {
        setTimeout(() => {
          this.$refs.loaderContainer.style.width = "50%";
          this.$refs.loaderContainer.style.borderRadius = "999px";
          this.$refs.loaderContainer.style.transform = "scale(0.2)";
          setTimeout(() => {
            this.isLoading = false;
          }, 800);
        }, 1000);
      }
    },
    searchItem(e) {
      this.search = e.target.dataset.id;
      this.isListShowing = false;
      let temp = [];
      if (this.search !== "all") {
        temp = this.quizImagesObject.filter((obj, index) => {
          if (this.quizImages.includes(obj[this.search])) {
            this.ind = index;
            return obj[this.search];
          }
        });
        setTimeout(() => {
          temp.map((obj) => {
            this.tempQuizImagesArray = [...Object.values(obj)];
          });
        }, 300);
      } else {
        setTimeout(() => {
          this.tempQuizImagesArray = [...this.quizImages];
        }, 300);
      }
    },
  },
};
</script>

<style>
.quiz-card-2 {
  transition: all 0.5s;
}
.hide-show {
  transition: all 1s;
}
</style>
