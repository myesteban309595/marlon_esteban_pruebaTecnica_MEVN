<template>
     <div class="body-home">
        <div class="scroll-users">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user,index) in users" :key="index">
                  <td>{{user.name}}</td>
                  <td>{{user.lastName}}</td>
                  <td>{{user.email}}</td>
                  <button id="edit" class="material-symbols-sharp" @click="getUserPhoto(user.photo, user.name, user.lastName, user.admin)">account_circle</button>
                  <button id="delete" class="material-symbols-sharp" @click="deleteUser(user._id)">delete</button>
                </tr>
              </tbody>
            </table>
            <div v-if="users.length==0" class="loading">
                  <div class="loader" ></div>
                  <p class="message" >Loading</p>
                </div>
          </div>
        </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { API } from '../constants/constants';

export default{
    data:()=>({
        users :[],
        API_HOST_BACKEND: API.API_HOST_BACKEND
    }),   
    created(){
      this.getUsers()
    },
    methods:{
        async getUsers(){
            axios.get(`${this.API_HOST_BACKEND}/user`, {
        headers: {
            authorization : Cookies.get('accessToken')
          }})
            .then(data=> {
                this.users = data.data
            }).catch(error=> {
              console.log(error);
            });
        },
        async deleteUser(id){
          axios.delete(`${this.API_HOST_BACKEND}/user/${id}`, {
        headers: {
            authorization : Cookies.get('accessToken')
          }})
          .then(()=> {
            this.getUsers()
          }).catch(error=> {
              this.getUsers()
              console.log(error);
            });
        },
        getUserPhoto(photo, name, lastName, admin){
          Swal.fire({
            title: admin == true ? "Admin" : "Cliente",
            text: `${name} ${lastName}`,
            imageUrl: photo,
            imageWidth: 250,
            imageHeight: 200,
            imageAlt: 'Custom image',
           })
        }
    }
}
</script>

<style lang="scss" scoped>
.body-home{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 13px;
    height: 100%;
    background-color: rgba(0, 255, 255, 0);
    padding: 3px;
}
.scroll-users{
  margin-top: 15px;
  margin-bottom: 57px;
  width: 95%;
  height: 380px;
  overflow-y: scroll;

}
table {
   width: 95%;
   border: 1px solid rgb(218, 217, 230);
   text-align: left;
   border-collapse: collapse;
   margin: 0 0 2em 0;
   caption-side: top;
   color: rgb(197, 205, 211);
   background-color:rgba(19, 35, 47, 0.9);
   box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
   border-radius: 5px;
   margin-bottom: 0px;
}
caption, td, th {
   padding: 1.1em;
}
th, td {
    margin: 2px;
   border-bottom: 1px solid #999;
   width: 45px;
   height:35px;
   text-align: center;
}
caption {
   font-weight: bold;
   font-style: italic;
}
#edit{
  margin-left: 20px;
  margin-top: 6px;
  margin-bottom: 5px;
  border-radius: 7px;
  background-color: rgb(167, 167, 241);
  &:hover{
    cursor: pointer;
    background-color: rgb(117, 117, 252);
  }
}
#delete{
  border-radius: 7px;
  margin-left: 7px;
  background-color: rgb(252, 177, 177);
  &:hover{
    cursor: pointer;
    background-color: rgb(255, 129, 129);
  }
}
// estilos de carga
.loading{
  position: relative;
  width: 100%;
  height: 100%;
}

.loading .loader{
  position: absolute;
  margin-left: 40%;
  margin-top: 22%;
  width: 80px;
  height: 80px;
  border: solid 5px #064555;
  border-top: solid 5px #7cd6ec;
  border-radius: 50%; 
  animation: loader .8s linear infinite;;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading .message{
  font-size: 20px;
  position: absolute;
  color: #101e22;
  top: 35%;
  left: 49%;
  transform: translate(-50%, -50%);
  animation: message 1s alternate infinite ease-in-out;
}
@keyframes message {
  0% {
    opacity: .4;
  }
  100% {
    opacity: 1;
  }
}
</style>