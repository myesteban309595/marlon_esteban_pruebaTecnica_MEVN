<template>
    <ul class="navigation-bar">
      <li>
        <p class="info-navbar">No eres un cliente o emplead@ aún ?</p>
      </li>
      <li>
        <button class="register-button" @click="registrate" href="/registro">Registrarme</button>
      </li>
    </ul>
  </template>
  
  <script>
 // import Swal from 'sweetalert2'
  export default {
    name: "NavigationBar",
    methods: {
       async registrate(){
         this.$router.push("/registro");
        console.log("hola desde registrarme");
//Swal.fire("he dado click")
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    display:inline-block;
    padding: 1em 0.5em;
  }

  .navigation-bar {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 0%;
    background-color: rgb(178, 224, 206);
  }
  .register-button{
    margin-right: 10px;
    width: 130px;
    height: 37px;
    border-radius: 5px;
    font-size: 14px;
    letter-spacing: 1px;
    text-decoration: none;
    overflow: hidden;
    background-color: cadetblue;
    border:0px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #2786b3;
      color: aliceblue;
      box-shadow: 0 0 15px #14a9ff
    }
  }
  
  </style>