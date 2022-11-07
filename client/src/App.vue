<template>
  <div class="hello-principal">
    <!-- <div class="hello-left">
      <div>
        <img class="imageIcon-vue" alt="Vue logo" src="./assets/logo.png">
      </div>
      <div class="saludo">
        <h1 >¡Bienvenido!</h1>
        <h1 >Inicia sesión</h1>
      </div>
    </div>

    <div class="hello-right">
      <navigation/>
      <p class="app-text">Prueba técnica One Gruop IT</p>
      <HelloWorld msg=""/>
    </div> -->

    <!-- probando el registro -->
    <!-- <RegisterUser/> -->
    <!-- probando al Home -->
    <HomePage/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import NavigationBar from './components/NavigationBar.vue'

import HomePage from './views/HomePage.vue';
export default {
  name: 'App',
  components: {
   //navigation: NavigationBar,
    //HelloWorld,
    ////RegisterUser
    HomePage,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.imageIcon-vue{
  width: 150px;
  margin-top: 25px;
}
.app-text{
  margin-top: 5px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 20px;
}

.hello-principal{
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
}

.hello-left{
  background-color: rgba(20, 159, 224, 0.979);
  width: 20%;
}
.hello-right{
  background-color: rgb(178, 224, 206);
  width: 80%;
}
.saludo{
  margin-top: 120px;
  color:azure;
}
</style>
