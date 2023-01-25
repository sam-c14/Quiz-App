import Quiz from "./pages/Quiz.vue";
import LoginPage from "./pages/LoginPage.vue";
import Home from "./pages/Home.vue";
import ResultPage from "./pages/ResultPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { Result } from "postcss";

const routes = [
  { path: "/", component: Home },
  {
    path: "/quiz/",
    component: Quiz,
  },
  { path: "/login", component: LoginPage },
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
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
