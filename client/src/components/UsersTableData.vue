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
                  <button id="edit" class="material-symbols-sharp" @click="updateUser(user._id)">edit</button>
                  <button id="delete" class="material-symbols-sharp" @click="deleteUser(user._id)">delete</button>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
</template>

<script>
import axios from 'axios';

export default{
    data:()=>({
        users :[]
    }),   
    created(){
      this.getUsers()
    },
    methods:{
        async getUsers(){
            axios.get('http://localhost:4040/user')
            .then(data=> {
                this.users = data.data
                console.log(data);
            }).catch(error=> {
              console.log(error);
            });
        },
        async deleteUser(id){
          axios.delete(`http://localhost:4040/user/${id}`)
          .then(data=> {
            console.log(data);
          }).catch(error=> {
              console.log("hola desde dele user front");
              console.log(error);
            });
        },
        updateUser(id){
          const updatedUser = {

          }
          axios.put(`http://localhost:4040/user/edit/${id}`,updatedUser)
            .then(data=> {
                console.log(data);
            }).catch(error=> {
              console.log(error);
            });
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
  margin-top: 10px;
  
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
   padding: 0.3em;
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
  margin-left: 40px;
  margin-top: 6px;
  margin-bottom: 5px;
  border-radius: 7px;
  background-color: rgb(131, 131, 255);
  &:hover{
    cursor: pointer;
    background-color: rgb(72, 72, 253);
  }
}
#delete{

  border-radius: 7px;
  margin-left: 10px;
  background-color: rgb(255, 162, 162);
  &:hover{
    cursor: pointer;
    background-color: rgb(255, 129, 129);
  }
}
</style>