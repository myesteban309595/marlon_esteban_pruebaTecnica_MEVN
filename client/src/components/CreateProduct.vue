<template>
    <div class="login">    
      <h1 class="title">Agregar Producto</h1>
      <form action class="form" @submit.prevent="CreateProduct">
        <input
          v-model="name"
          class="form-input"
          type="text"
          id="name"
          required
          placeholder="Tu producto"
        >
        <input
          v-model="price"
          class="form-input"
          type="text"
          id="price"
          placeholder="Precio"
        >
        <input
          v-model="qualification"
          class="form-input"
          type="text"
          id="calificacion"
          placeholder="Calificacion"
        >
        <input
          v-model="url"
          class="form-input"
          type="text"
          id="url"
          placeholder="Url de la imagen"
        >
        <!-- <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p> -->
        <button class="form-submit" type="submit" value="Login"> Registrar Producto</button>
      </form>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import Swal from 'sweetalert2';
import {getProduct} from '@/views/HomePage.vue';
 //import auth from "./CreateProduct.vue";
  export default {
    data: () => ({
      name: "",
      price: "",
      qualification: "",
      url: ""
    }),
    components:{

    },
    //  created(){
    //    getProduct()
    //  },
    methods: {
      async CreateProduct() {
        try {
          const product = {
            name: this.name,
            price: this.price,
            qualification: this.qualification,
            url: this.url
          };
          await axios.post('http://localhost:4040/product/createProduct', product)
          getProduct()
          .then(
          )
          //   console.log(product);
        //   this.$router.push("/");
        } catch (error) {
          console.log(error);
          Swal.fire(error.request.statusText)
        //   this.error = true;
        }
      },
      async registrate() {
        console.log("GOLA MUNDO DESDE REGISTRATE");
        this.$router.push("/");

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
    min-width: 250px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 45px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  
  .form-input {
    margin: 10px;
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
    &:focus {
      outline: 0;
      border-color: #fffb25;
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
  