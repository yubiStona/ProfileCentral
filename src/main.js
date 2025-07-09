import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap";
import BootstrapVueNext from 'bootstrap-vue-next'
const app = createApp(App);
app.use(router);
app.use(BootstrapVueNext);
app.mount("#app");

// Add error handling
app.config.errorHandler = (err, instance, info) => {
  console.error("Vue error:", err, info);
};
