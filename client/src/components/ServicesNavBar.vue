<template>
    <div class="navbar-services" >
        <div class="navbar-services-left">
            <img class="userphoto" @click="changePhoto()" :src="token.photo" alt="">
            <p class="saludo-usuario"><strong>Bienvenid@</strong> {{token.name}}</p>
            <p class="material-symbols-sharp">person</p>
        </div>
        <div class="navbar-services-right">
             <p v-if="administrator" >Administrador</p>
             <p v-if="!administrator" >Cliente</p>
            <button @click="logout" id="logout" class="material-symbols-sharp">logOut</button>
        </div>
    </div>
</template>
<script>

import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios';
import { API } from '../constants/constants';

export default {
    data(){
      return{
        token: VueJwtDecode.decode(Cookies.get("accessToken")),
        administrator: false,
        API_HOST_BACKEND: API.API_HOST_BACKEND
      }
    },
    mounted(){
      //console.log(this.token);
    },
    created(){
      this.administrador()
    },
    methods: {
        logout(){
         Swal.fire({
          icon: "question",
          title: "Cerrar Sesión",
          text: "¿Esta seguro que desea salir?",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3085d6",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          background:"white"
         }).then(({isConfirmed})=> {
          if(isConfirmed){           
           Cookies.remove('accessToken');
           this.$router.push("/");
         }})
        },
        administrador(){
          this.token.admin === true ? this.administrator = true : this.administrator = false ;
        },
        async changePhoto(){
          
          Swal.fire({
  title: 'Ingresa la Url de la foto',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Cambiar',
  cancelButtonText: 'Cerrar',
  showLoaderOnConfirm: true,
  preConfirm: (photo) => {
    console.log(photo);
    const data = {
      name: this.token.name,
      lastName: this.token.lastName,
      admin: this.token.admin,
      photo: photo
    }
    return axios.put(`${this.API_HOST_BACKEND}/user/${this.token._id}`, data, {
        headers: {
            authorization : Cookies.get('accessToken')
          }})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        Swal.showValidationMessage(
          `Request failed: ${error.message}`
        )
      })
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  console.log("result",result);
  if (result.isConfirmed) {
    Swal.fire({
      title: `¡Todo listo ${this.token.name}!`,
      imageUrl: result.value
    })
  }
})
        }
    }
  }
</script>

<style lang="scss" scoped>
p{
  color: aliceblue;
  letter-spacing: 0.8px;
  font-size: 20px;
  margin-right: 8px;
}
.navbar-services{
  height: 55px;  
  background: linear-gradient(to right, #8c959b, #2c445e);
  padding:2px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.navbar-services-left{
  width: 50%;  
  background: transparent;
  padding:5px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 30px;
}
.navbar-services-right{
  width: 50%;  
  background-color:transparent;
  padding:5px;
  display: flex;
  justify-content: end;
  align-items: center;
}
#logout{
    width: 60px;
    height: 40px;
    margin-right: 50px;
    margin-left: 15px;
    border-radius: 8px;
    &:hover{
        background-color:  #8c959b;
        cursor: pointer;
    }
}
.saludo-usuario{
    font-size: 25px;
    color: aliceblue;
}
.material-symbols-sharp {
  margin-left: 10px;
  font-variation-settings:
  'FILL' 0,
  'wght' 800,
  'GRAD' 200,
  'opsz' 48
}
.userphoto{
  width: 45px;
  border-radius: 12px;
  margin-right: 10px;
  cursor: pointer;
}
</style>