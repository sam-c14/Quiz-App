import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./assets/main.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
var self = "110";
self = self.replace(self.substring(self.length - 1, self.length), " ").trim();

var obj = {};

console.log(obj["nameKey"]);
