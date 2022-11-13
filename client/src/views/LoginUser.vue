<template>
    <div class="login">    
      <h1 class="title">Iniciar Sesión</h1>
      <form action class="form" @submit.prevent="login">
        <label class="form-label" for="#email">Email</label>
        <input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="pepito@hotmail.com"
        >
        <label class="form-label" for="#password">Password</label>
        <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        >
        <p >
          <a class="forgot-password" @click="forgot">He olvidado mi contraseña</a>
        </p>
        <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p>
          <button class="form-submit" type="submit" value="Login"> Login</button>
      </form>
      <p class="msg">¿No tienes cuenta?
        <a @click="registrate" class="registrate" >Regístrate</a>
      </p>
    </div>
  </template>
  
  <script>
  //import auth from "@/utils/auth";
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import VueJwtDecode from 'vue-jwt-decode'
  import Cookies from 'js-cookie';
  import { API } from '../constants/constants';

  export default {
    data: () => ({
      email: "",
      password: "",
      error: false,
      API_HOST_BACKEND : API.API_HOST_BACKEND
    }),
    mounted(){
    },
    methods: {
      async login() {
        try {
          const API_HOST_BACKEND = this.API_HOST_BACKEND
          const user = {
            email:this.email, 
            password:this.password
           }
          await axios.post(`${API_HOST_BACKEND}/login`, user)
          .then(({data}) => {
            const token = data.data.token
            Cookies.set("accessToken", token);
            const userData = VueJwtDecode.decode(token);
            if(userData.admin === true){
              Swal.fire({
                title:'Bienvenido Administrador'
              })
              .then(({isConfirmed})=>{
                console.log(isConfirmed);
                this.$router.push("/homepage");
              })
              .catch(error=> {
                console.log(error);
              })
            }else{
              this.$router.push("/homepage");
            }
          })
          .catch(error => {
            console.log(error);
            Swal.fire(error.response.data)
          })
         
        }catch (error) {
          console.log(error);
        }
      },
      async registrate() {
        this.$router.push("/registro");
      },
      async forgot() {
        this.$router.push("/resetpassword");
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .login {
    padding: 0.5rem;
  }
  .title {
    margin-top: 0px;
    margin-bottom: 2px;
    text-align: center;
    color: #bd356e;
    font-family:'Times New Roman', Times, serif;
    font-size:36px ;
  }
  .form {
    margin: 0.8rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    height: 250px;
    min-width: 280px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 50px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {
    margin-top: 2rem;
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
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background: #2786b3;
      color: aliceblue;
      box-shadow: 0 0 5px #14a9ff
    }
  }
 
  .error {
    margin: 1rem 0 0;
    color: #ff4a96;
  }
  .msg {
    margin-top: 1.5rem;
    text-align: center;
  }
  .registrate {
    color: #ff4a96;
    &:hover {
      outline: 0;
      color: #6150c5;
    }
  }
  .forgot-password {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    color: white;
    text-decoration: none;
    &:hover {
    color: #dbdd7e;
    text-decoration:underline;
    box-shadow: 0 4px 10px 4px rgba(151, 108, 108, 0.103);
  }
  }
  </style>
  