import Vue from 'vue'
import Router from 'vue-router'

//import App from './App'
import HelloWorld from '../components/HelloWorld.vue'
import LoginUser from '../views/LoginUser.vue'
import RegisterUser from '../views/RegisterUser.vue'

Vue.use(Router);

const routes = [
    {path: "/", component: HelloWorld},
    {path: "/login", component: LoginUser},
    {path: "/registro", component: RegisterUser},
]

const router = new Router({
    mode: history,
    routes
})

export default router;
