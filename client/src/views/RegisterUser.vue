<template>
    <div class="register-principal">
      <div >
        <h1 class="title">Registrarse</h1>
        <form action class="form" @submit.prevent="register">
          <label class="form-label" for="#email">Nombre</label>
          <input
            v-model="name"
            class="form-input"
            type="text"
            id="name"
            required
            placeholder="Nombres"
          >
          <label class="form-label" for="#email">Apellidos</label>
          <input
            v-model="lastName"
            class="form-input"
            type="text"
            id="lastName"
            required
            placeholder="Apellidos"
          >
          <label class="form-label" for="#email">Email</label>
          <input
            v-model="email"
            class="form-input"
            type="email"
            id="email"
            required
            placeholder="pepito@mail.com"
          >
          <label class="form-label" for="#password">Password</label>
          <input
            v-model="password"
            class="form-input"
            type="password"
            id="password"
            placeholder="Password"
          >
          <label class="form-label" for="#password-repeat">Repite la contraeña</label>
          <input
            v-model="passwordRepeat"
            class="form-input"
            type="password"
            id="password-repeat"
            placeholder="Password"
          >
          <input class="form-submit" type="submit" value="Sign Up">
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2'
  import auth from "@/utils/auth.js";

  export default {
    data: () => ({
      name: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: ""
    }),
    methods: {
      async register() {
        try {
          if(this.password === this.passwordRepeat){
            await auth.register(this.name, this.lastName,this.email, this.password);
            this.$router.push("/");
          }else{
            Swal.fire({
              icon: "warning",
              title: "Las contraseñas no coinciden",
               confirmButtonText: "Entendido",
               confirmButtonColor: "#3085d6",
            })
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  html,body{
  margin: 0;
  padding: 0;
}

body{
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  letter-spacing: 0.03em;
  line-height: 1.6;
  color: azure;
}
  .register-principal {
    background-image: url("https://fondosmil.com/fondo/20893.jpg");
    width: 100%;
    height: 100%;
    max-width: 100%;
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem;
  }

  .title {
    margin-top: 0px;
    margin-bottom: 2px;
    text-align: center;
    color: #bd356e;
    font-family:'Times New Roman', Times, serif;
    font-size:40px ;
  }
    
  .form {
    height: 480px;
    margin: 1.0rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 310px;
    max-width: 100%;
    max-height: 520px;
    background: rgba(19, 35, 47, 0.938);
    border-radius: 5px;
    padding: 30px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {

    margin-top: 1.5rem;
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
    background: #1ab188;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #0b9185;
    }
  }
  .error {
    margin: 1rem 0 0;
    color: #ff4a96;
  }
  </style>