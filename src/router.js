import Quiz from "./pages/Quiz.vue";
import LoginPage from "./pages/LoginPage.vue";
import Home from "./pages/Home.vue";
import ResultPage from "./pages/ResultPage.vue";
import SampleQuizPage from "./pages/SampleQuizPage.vue";
import SampleResultPage from "./pages/SampleResultPage.vue";
import About from "./pages/About.vue";
import AllQuiz from "./pages/AllQuiz.vue";
import Contact from "./pages/Contact.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/quiz/:category/:difficulty",
    name: "quiz",
    component: Quiz,
  },
  { path: "/login/:category/:difficulty", name: "login", component: LoginPage },
  {
    path: "/result/:score/:resultArr?",
    name: "result",
    component: ResultPage,
    props(route) {
      const resultArr = route.params.resultArr || "";

      return {
        resultArr: resultArr === "" ? [] : resultArr.split(","),
      }; // To pass the full result array to the result page
    },
  },
  {
    path: "/about-quiz",
    component: About,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/allQuiz",
    component: AllQuiz,
  },
  { path: "/sample-quiz", component: SampleQuizPage },
  { path: "/sample-result", component: SampleResultPage },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  mode: "history",
  routes, // short for `routes: routes`
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top if previousScrolled position is not available
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
export default router;
