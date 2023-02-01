import Quiz from "./pages/Quiz.vue";
import LoginPage from "./pages/LoginPage.vue";
import Home from "./pages/Home.vue";
import ResultPage from "./pages/ResultPage.vue";
import AllQuizPage from "./pages/AllQuizPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", components: { default: Home } },
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
      };
    },
  },
  {
    path: "/allQuiz",
    name: "allQuiz",
    component: AllQuizPage,
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
