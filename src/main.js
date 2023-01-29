import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./assets/main.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
window.addEventListener("scroll", (e) => {
  console.log(document.body.getBoundingClientRect());
});
