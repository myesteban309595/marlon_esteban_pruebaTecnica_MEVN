<template>
    <div class="navbar-services" >

        <input type="checkbox" id="btn-menu">
        <div class="container-menu">
          <div class="cont-menu">
            <img class="menu-foto" :src="data.photo" alt="">
            <nav>
              <a href="#">Facebook</a>
              <a href="#">Suscribirse</a>
              <a href="https://github.com/myesteban309595/marlon_esteban_pruebaTecnica_MEVN">Repositorio</a>
              <a href="#" @click="configurations= !configutations" >Configuraciones</a>
            </nav>
            <label for="btn-menu" class="material-symbols-outlined">close</label> 
            <div v-if="configurations==true" class="configuratios-options">
              <nav>
                <a @click="ResetPassword=!ResetPassword">Reset Password</a>
              </nav>
            </div>
          </div>
        </div>

        <div v-if="ResetPassword" class="resetPassword">
          <ResetPassword/>
          <label @click="ResetPassword=false" class="material-symbols-outlined">close</label> 
        </div>
    
        <div class="navbar-services-left">
            <img class="userphoto" @click="changePhoto()" :src="data.photo" alt="">
            <p class="saludo-usuario"><strong>Bienvenid@</strong> {{token.name}}</p>
            <p class="material-symbols-sharp">person</p>
        </div>
        <div class="navbar-services-right">
             <p v-if="administrator" >Administrador</p>
             <p v-if="!administrator" >Cliente</p>
            <button @click="logout" id="logout" class="material-symbols-sharp">logOut</button>
        </div>
        <div class="btn-menu">
          <label class="btn-menu-icon" for="btn-menu">☰</label>
        </div>
      </div>
</template>
<script>

import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios';
import { API } from '../constants/constants';
import ResetPassword from '../views/ResetPassword.vue';

export default {
    data(){
      return{
        token: VueJwtDecode.decode(Cookies.get("accessToken")),
        administrator: false,
        API_HOST_BACKEND: API.API_HOST_BACKEND,
        configurations: false,
        ResetPassword: false,
        photo : "",
        data: {}
      }
    },
    components:{
      ResetPassword
    },
    mounted(){
      //console.log(this.token);
    },
    created(){
      this.administrador()
      this.getUsers()
    },
    methods: {
      async getUsers(){
            axios.get(`${this.API_HOST_BACKEND}/user/getphoto/${this.token._id}`, {
        headers: {
            authorization : Cookies.get('accessToken')
          }})
            .then(({data})=> {
              console.log("data", data);  
              this.data = data
            }).catch(error=> {
              console.log(error);
            });

        },
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
           inputPlaceholder: "http or https format images",
           showCancelButton: true,
           confirmButtonText: 'Cambiar',
           cancelButtonText: 'Cerrar',
           showLoaderOnConfirm: true,
            preConfirm: (photo) => {
             console.log(photo);
             const data = { 
               photo: photo
             }
             if(photo.startsWith('http')){       
               return axios.patch(`${this.API_HOST_BACKEND}/user/changephoto/${this.token._id}`, data, {
                 headers: {
                     authorization : Cookies.get('accessToken')
                  }})
                 .then(response => {
                   console.log(response.data);
                   this.photo = response.data.photo
                 })
                 .catch(error => {
                  Swal.showValidationMessage(
                 `Request failed: ${error.message}`
                  )
                 })
             }else {
              Swal.fire('El formato de la imagen debe ser http o https')
             }
            },
              allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
           if (result.isConfirmed && this.photo.startsWith('http')) {
             Swal.fire({
              title: `¡Todo listo ${this.token.name}!`,
              imageUrl: result.value
              })
             }else{
              Swal.fire('El formato de la imagen debe ser http o https')
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
    margin-right: 35px;
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

/*Menù lateral*/
#btn-menu{
		display: none;
	}
.btn-menu  .btn-menu-icon{
  cursor: pointer;
  font-size: 25px;
  margin-right: 30px;
  color:#ffff;
  &:hover{
    font-size: 27px;
    margin-right: 28px;
  }
}
	.container-menu{
		position: absolute;
		background: rgba(0,0,0,0.2);
		width: 100%;
		height: 100vh;
		top: 0;left: 0;
		transition: all 500ms ease;
		opacity: 0;
		visibility: hidden;
	}
	#btn-menu:checked ~ .container-menu{
		opacity: 1;
		visibility: visible;
	}
	.cont-menu{
		width: 100%;
		max-width: 250px;
		background: rgba(19, 35, 47, 0.9);;
		height: 100vh;
		position: relative;
		transition: all 500ms ease;
		transform: translateX(-100%);
	}
	#btn-menu:checked ~ .container-menu .cont-menu{
		transform: translateX(0%);
	}
	.cont-menu nav{
		transform: translateY(15%);
	}
	.cont-menu .menu-foto{
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-top: 35px;
    margin-left: 70px;
  }
	.cont-menu nav a{
		display: block;
		text-decoration: none;
		padding: 20px;
		color: #c7c7c7;
		border-left: 5px solid transparent;
		transition: all 400ms ease;
	}
	.cont-menu nav a:hover{
		border-left: 5px solid #c7c7c7;
		background: #524f4f;
    font-size: 20px;
	}
	.cont-menu label{
		position: absolute;
		right:15px;
		top: 15px;
		color: #fff;
		cursor: pointer;
		font-size: 18px;
    &:hover{
      font-size: 20px;
    }
	}

  .configuratios-options{
    align-items: center;
		position: absolute;
		background: rgba(19, 35, 47, 0.94);;
		width: 70%;
    height: 13%;
		top: 340px;left: 255px;
		transition: all 500ms ease;
    opacity: 1;
		visibility: visible;
	}
	/*Fin de Menù lateral*/

  .resetPassword{
    position: absolute;
    top: 0;
    padding: 12px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    background: rgba(80, 117, 143, 0.863);;
  }
  .resetPassword label{
    top: 20px;
    right: 25px;
    position: absolute;
    cursor: pointer;
    &:hover{
      font-size: 28px;
    }
  }
</style>