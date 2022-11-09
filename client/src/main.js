// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import Vue from "vue";
import Router from "vue-router";

import App from "./App";
import PrincipalPage from './views/PrincipalPage.vue';
import RegisterUser from './views/RegisterUser.vue';
import HomePage from './views/HomePage.vue'

Vue.use(Router);

const routes = [
  { path: "/", component: PrincipalPage },
  { path: "/registro", component: RegisterUser },
  { path: "/homepage", component: HomePage },
];

const router = new Router({
  routes
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");