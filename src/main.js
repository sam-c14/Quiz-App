import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./assets/main.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
function getQuestions() {
  fetch(
    "https://the-trivia-api.com/api/questions?limit=20&categories=science",
    {
      headers: {
        // An API key is not required for this endpoint,
        // but can be used to bypass the rate limit or request
        // more questions.
        "Content-Type": "application/json",
      },
    }
  )
    .then((data) => data.json())
    .then((data) => console.log(data));
}
getQuestions();
