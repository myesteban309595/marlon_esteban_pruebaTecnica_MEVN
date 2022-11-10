<template>
    <div class="hello-principal">
      <div class="hello-left">
        <div>
          <img class="imageIcon-vue" alt="Vue logo" src="../assets/logo.png">
        </div>
        <div class="saludo">
          <h1 >¡Bienvenido!</h1>
          <h1 >Inicia sesión</h1>
        </div>
      </div>
  
      <div class="hello-right">
        <navigation/>
        <p class="app-text">Prueba técnica One Gruop IT</p>
        <HelloWorld/>
      </div>
      <HomePage/>
    </div>
  </template>
  
  <script>
  import HelloWorld from '../components/HelloWorld.vue'
  import NavigationBar from '../components/NavigationBar.vue'
  
  import Cookies from 'js-cookie'

  export default {
    components: {
     navigation: NavigationBar,
      HelloWorld,
    },
    created(){
      this.closeSession()
    },
    methods:{
      closeSession(){
        if(Cookies.remove('accessToken')){
          Cookies.remove('accessToken')
        }
      }
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
  .hello-principal{
    width: 100%;
    height: 100%;
  }
  .imageIcon-vue{
    width: 150px;
    margin-top: 25px;
  }
  .app-text{
    display: flex;
    justify-content: center;
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
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    background-color: rgba(20, 159, 224, 0.979);
    width: 25%;
  }
  .hello-right{
    background-color: rgb(178, 224, 206);
    width: 75%;
  }
  .saludo{
    margin-top: 120px;
    color:azure;
  }
  </style>
  