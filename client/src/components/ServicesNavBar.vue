<template>
    <div class="navbar-services" >
        <div class="navbar-services-left">
            <p class="saludo-usuario"><strong>Bienvenid@</strong> {{"USUARIO"}}</p>
            <p class="material-symbols-sharp">person</p>
        </div>
        <div class="navbar-services-right">
            <button @click="logout" id="logout" class="material-symbols-sharp">logOut</button>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2';
export default {
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
           window.location = '/';
         }})
       }
    }
}
</script>


<style lang="scss" scoped>
.navbar-services{
  height: 55px;  
  background-color: rgb(232, 240, 250);
  padding:2px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.navbar-services-left{
  width: 50%;  
  background-color: rgb(232, 240, 250);
  padding:5px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 30px;
}
.navbar-services-right{
  width: 50%;  
  background-color: rgb(232, 240, 250);
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
        background-color: rgba(255, 94, 94, 0.849);
        cursor: pointer;
    }
}
.saludo-usuario{
    font-size: 25px;
}
.material-symbols-sharp {
  margin-left: 10px;
  font-variation-settings:
  'FILL' 0,
  'wght' 800,
  'GRAD' 200,
  'opsz' 48
}
</style>