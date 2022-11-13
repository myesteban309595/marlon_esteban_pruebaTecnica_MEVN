<template>
      <form action class="form" @submit.prevent="resetSendEmail">
        <h1 class="title">Reestablecer contraseña</h1>
        <label class="form-label" for="#password">Actual Password</label>
         <input v-model="password" class="form-input" type="password" id="password" required placeholder="password">
        <label class="form-label" for="#password">New Password</label>
         <input v-model="password" class="form-input" type="password" id="password" required placeholder="password">
        <label class="form-label" for="#password">Repeat Password</label>
         <input v-model="repeatpassword" class="form-input" type="password" id="password" required placeholder="password">

        <button class="form-submit" type="submit" value=""> Enviar</button>
      </form>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  //import VueJwtDecode from 'vue-jwt-decode'
  //import Cookies from 'js-cookie';
  import { API } from '../constants/constants';

  export default {
    data: () => ({
      email: "",
      password: "",
      repeatpassword: "",
      API_HOST_BACKEND : API.API_HOST_BACKEND,
      setEmailSent: false
    }),
    mounted(){
    },
    methods: {
      async resetSendEmail() {
        try {
          const API_HOST_BACKEND = this.API_HOST_BACKEND
          const body = {
            email: this.email 
           }
          await axios.patch(`${API_HOST_BACKEND}/user/forgot`, body)
          .then(() => {
          })
          .catch(error => {
            console.log(error);
            Swal.fire(error.response.data)
          })
        }catch (error) {
          console.log(error);
        }
      },
      async BackHome() {
        //this.$router.push("/");
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .title {
    text-align: center;
    color:beige;
    font-family:'Times New Roman', Times, serif;
    font-size:36px ;
  }
  .form {
    margin-top: 20px;
    margin: 0.8rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    height: 470px;
    min-width: 280px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 50px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {
    margin-top: 1rem;
    color: white;
    margin-bottom: 0.5rem;
    &:first-of-type {
        margin-top: 0rem;
    }
  }
  .form-input {
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
    margin-bottom: 10px;
    &:focus {
      outline: 0;
      border-color: #1ab188;
    }
  }
  .form-submit {
    background:  #2e8297;
    border: none;
    color: white;
    font-size: 15px;
    letter-spacing: 1px;
    margin-top: 1rem;
    padding: 1rem 0;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background: #2786b3;
      color: aliceblue;
      box-shadow: 0 0 5px #14a9ff
    }
  }
 .form a{
  text-decoration: none;
  text-align: center;
 }
  </style>
  