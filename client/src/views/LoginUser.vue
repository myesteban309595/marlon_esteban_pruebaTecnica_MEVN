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
        <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p>
        <input class="form-submit" type="submit" value="Login">
      </form>
      <p class="msg">¿No tienes cuenta?
        <a class="registrate" href="/register">Regístrate</a>
      </p>
    </div>
  </template>
  
  <script>
//  import auth from "@/logic/auth";
  export default {
    data: () => ({
      email: "",
      password: "",
      error: false
    }),
    methods: {
      async login() {
        try {
        //   await auth.login(this.email, this.password);
        //   const user = {
        //     email: this.email
            //};
        //   auth.setUserLogged(user);
        //   this.$router.push("/");
        } catch (error) {
          console.log(error);
        //   this.error = true;
        }
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .login {
    padding: 0.5rem;
  }
  .title {
    margin-top: 0px;
    margin-bottom: 5px;
    text-align: center;
    color: #bd356e;
    font-family:'Times New Roman', Times, serif;
    font-size:40px ;
  }
  .form {
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 350px;
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
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #0b6791;
    }
  }
  .error {
    margin: 1rem 0 0;
    color: #ff4a96;
  }
  .msg {
    margin-top: 2rem;
    text-align: center;
  }
  .registrate {
    color: #ff4a96;
    &:hover {
      outline: 0;
      color: #311ab1;
      box-shadow: 0 4px 10px 4px rgba(226, 93, 93, 0.3);
    }
  }
  </style>
  