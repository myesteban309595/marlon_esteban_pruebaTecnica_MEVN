<template>
    <div class="login">    
      <h1 v-if="update ==null" class="title">Agregar Producto</h1>
      <h1 v-if="update" class="title">Editar Producto</h1>
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
          v-model="url"
          class="form-input"
          type="text"
          id="url"
          placeholder="Url de la imagen"
         >
           <p class="clasificacion">
            <input  v-model="qualification" id="radio1" type="radio" name="estrellas" value="5">
          <label for="radio1" class="material-symbols-outlined" >star</label>
          <input v-model="qualification" id="radio2" type="radio" name="estrellas" value="4">
          <label for="radio2" class="material-symbols-outlined" >star</label>
          <input v-model="qualification" id="radio3" type="radio" name="estrellas" value="3">
          <label for="radio3" class="material-symbols-outlined" >star</label>
          <input v-model="qualification"  id="radio4" type="radio" name="estrellas" value="2">
          <label for="radio4" class="material-symbols-outlined" >star</label>
          <input v-model="qualification" id="radio5" type="radio" name="estrellas" value="1">
          <label for="radio5" class="material-symbols-outlined" >star</label>
           </p>
        <!-- <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p> -->
        <button v-if="update==null" class="form-submit" type="submit" value="value"> Registrar Producto</button>
        <button v-if="update" class="form-submit" type="submit" value="value"> Editar Producto</button>
      </form>
    </div>
  </template>
  
  <script>

import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode'

import { API } from '../constants/constants';

  export default {
    props:{
      update : null
    },
    components:{
    },
    data: () => ({
      name: "",
      price: "",
      qualification: "",
      url: "",
      tokenDecoded: VueJwtDecode.decode(Cookies.get('accessToken')),
      API_HOST_BACKEND: API.API_HOST_BACKEND
    }),
    created(){
      this.datos()
    },
    methods: {
      async CreateProduct() {
        if(this.update==null){
            const product = {
              name: this.name,
              price: this.price,
              qualification: this.qualification,
              url: this.url,
              postedBy: this.tokenDecoded._id
            }
            await axios.post(`${this.API_HOST_BACKEND}/product/createProduct`, product, {
              headers: {
                 authorization : Cookies.get('accessToken')
               }
              })
             .then((data)=> {
              Swal.fire({
                icon: "success",
                title: data.data,
              })
              .then((isConfirm)=> {
                console.log(isConfirm);
                location.reload()
              })
             .catch(error=> {
                console.log(error);
               Swal.fire(error.request.statusText)
              })
            });
        }else{
           const product = {
              name: this.name,
              price: this.price,
              qualification: this.qualification,
              url: this.url,
              postedBy: this.tokenDecoded._id
             };
            await axios.put(`${this.API_HOST_BACKEND}/product/edit/${this.update._id}`, product,{
            headers: {
                authorization : Cookies.get('accessToken')
             }
            })
            .then((data)=> {
              Swal.fire({
                icon: "success",
                title: data.data,
              })
              .then((isConfirm)=> {
                console.log(isConfirm);
                location.reload()
              })
              // this.$emiter('escucharHijo', getProduct())
            })
            .catch (error=> {
             console.log(error);
           })
        }
      },
      async datos(){
         this.name = this.update != null ? this.update.name : "",
         this.price= this.update != null ? this.update.price : "",
         this.qualification= this.update != null ? this.update.qualification : "",
         this.url= this.update != null ? this.update.url : "" 
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .login {
    padding: 0.5rem;
  }
  input[type="radio"] {
  display: none;
}

label {
  margin-left: 5px;
  color: grey;
}

.clasificacion {
  display: flex;
  justify-content: center;
  direction: rtl;
  unicode-bidi: bidi-override;
}

label:hover,
label:hover ~ label {
  color: orange;
}

input[type="radio"]:checked ~ label {
  color: orange;
}

  .title {
    margin-top: 0px;
    margin-bottom: 2px;
    text-align: center;
    color: rgba(19, 35, 47, 0.9);
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
    margin-bottom: 4px;
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
  