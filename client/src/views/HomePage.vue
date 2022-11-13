<template>
    <div class="home">

      <div>
        <ServicesNavBar token/>
      </div>

      <div class="container-pages">
        <div v-if="adminUser" class="page-left">
          <UsersTableData/>
          <button v-if="administrator" @click="adminUser = null" class="admP" >Administrar Productos</button>
        </div>

        <div v-if="adminUser==null" class="page-left">
          <CreateProduct :update="updateProps" @escucharHijo="getProduct()"></CreateProduct>
          <button v-if="administrator" @click="adminUser = !adminUser" class="admU">Administrar Usuarios</button>
        </div>

        <div class="page-right">
          <div class="scroll-principal">   
           <div class="products-container"  v-for="(product,index) in products" :key="index">
             <div v-if="products[0] !== 'empty'" class="productCard">
               <p class="price"><strong> Precio: </strong> {{product.price +" $"}}</p>
               <img class="image-list" :src="product.url" alt="">
               <grid class="crud-format">
                 <grid class="crud-format-productname">
                   <p class="product-name">{{product.name}} </p>
                 </grid>
                 <grid class="crud-format-buttons">              
                   <button  id="edit" class="material-symbols-sharp" @click="updateProduct(product)">edit</button>
                   <button id="delete" class="material-symbols-sharp" @click="deleteProduct(product._id)">delete</button>
                  </grid>
                </grid>
                  <p class="clasificacion">
                   <label v-if="(product.qualification == 1)" for="radio11">★</label>
                   <label v-if="(product.qualification == 2)" for="radio22">★★</label>
                   <label v-if="(product.qualification == 3)" for="radio33">★★★</label>
                   <label v-if="(product.qualification == 4)" for="radio44">★★★★</label>
                   <label v-if="(product.qualification == 5)" for="radio55">★★★★★</label>
                  </p>
              </div>
            </div>
            <div v-if="products.length==0" class="loading">
              <div class="loader" ></div>
              <p class="message" >Loading</p>
            </div>
            <div class="empty-products">
              <p v-if="products[0] === 'empty'">No tienes productos aún 🥴</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>

<script>
import ServicesNavBar from '@/components/ServicesNavBar.vue';
import axios from 'axios';
import CreateProduct from '../components/CreateProduct.vue';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode'
import UsersTableData from '@/components/UsersTableData.vue';

import { API } from '../constants/constants';

export default {
    components: {
    ServicesNavBar,
    CreateProduct,
    UsersTableData
},
    data(){
      return{
         token: VueJwtDecode.decode(Cookies.get("accessToken")),
         products: [],
         updateProps : null,
         adminUser : null,
         administrator: false,
         API_HOST_BACKEND : API.API_HOST_BACKEND,
         changestate: null
       }
    },
    created(){
      this.getProduct(),
      this.administrador()
    },
    mounted(){
      console.log("API_HOST_BACKEND", this.API_HOST_BACKEND);
    },
    methods:{
      getProduct(){
        axios.get(`${this.API_HOST_BACKEND}/product/myproducts`, {
          headers: {
            authorization : Cookies.get('accessToken')
          }
        })
        .then(({data})=> {
          if(data.myproducts.length == 0){
            this.products = ["empty"]
          }else{
            this.products = data.myproducts.reverse()
          }
        }).catch(error=> {
          Swal.fire(error.response.data)
          .then(() => {
            Cookies.remove('accessToken')
            this.$router.push("/")
          })
        })
      },
      updateProduct(product){ 
        const {_id,name,price,qualification,url} = product;
        if(this.updateProps == null){
          this.updateProps = {_id,name,price,qualification,url};
        }else{
          this.updateProps = null;
        }
      },
      deleteProduct(id){
        Swal.fire({
        //position: "center-left",
        title: "Eliminar producto",
        text:"Desea eliminar este producto?",
        confirmButtonText: "Sí, Eliminar",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        // imageUrl: 'https://unsplash.it/400/200',
        // imageWidth: 250,
        // imageHeight: 230,
        // imageAlt: 'Custom image',
        }).then(({isConfirmed})=> {
        if(isConfirmed){
          axios.delete(`${this.API_HOST_BACKEND}/product/deleteproduct/${id}`,{
          headers: {
            authorization : Cookies.get('accessToken')
          }
        })
        .then(data=> {
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado'
            )
          this.getProduct();
          console.log("eliminar:",data);
        })
        .catch(error=> {
          Cookies.remove('accessToken')
          this.$router.push("/")
          console.log(error);
        })
        }
       })
      },
      administrador(){
        console.log(this.token);
          this.token.admin === true ? this.administrator = true : this.administrator = false ;
      },
      changeState(){
     
      },
   }
}
</script>

<style lang="scss" scoped>

  #form {
  width: 250px;
  margin: 0 auto;
  height: 50px;
}

#form p {
  text-align: center;
}

#form label {
  font-size: 20px;
}

input[type="radio"] {
  display: none;
}

label {
  color: grey;
  color: orange;
}

.clasificacion {
  direction: rtl;
  unicode-bidi: bidi-override;
}

input[type="radio"]:checked ~ label {
  color: orange;
}

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

.home{
  width: 100%;
  background: linear-gradient(to right, #d4dbe0, #a8b6c5);
}
.scroll-principal{
  margin-top: 15px;
  height: 530px;
 overflow-y: scroll;
}
.container-pages{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.price{
  margin-top: 2px;
  margin-bottom: 1px;
  color:rgb(0, 3, 3)
}
.products-container{
  margin-top: 25px;
  width: 47%;
  height: 50%;
  max-width: 1200px;
  height: 430px;
  display:inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.products-container .productCard{
  width: 310px;
  height: 375px;
  border-radius: 8px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.721);
  overflow: hidden;
  margin: 10px;
  text-align: center;
  transition: all 0.10s;
  background: linear-gradient(to right, #eff0f3, #d8d6e0);
  &:hover{
    transform: translateY(-15px);
    box-shadow: 0 12px 16px rgba(0,0,0,0.4);
  }
}
.products-container .productCard img{
  width: 300px;
  height: 270px;
}
.product-name{
  font-weight: bold;
  font-size: 20px;
  margin-top: 3px;
  margin-bottom: 2px;
}
.page-right{
  width: 60%;
}
.page-left{
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.crud-format{
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.crud-format-productname{
  width: 70%;
  margin-left: 8px;
  display: flex;
  justify-content: start;
}
.crud-format-buttons{
  width: 30%;
  margin-right: 5px;
}
#edit{
  border-radius: 7px;
  background-color: rgb(167, 167, 241);
  &:hover{
    cursor: pointer;
    background-color: rgb(117, 117, 252);
  }
}
#delete{
  border-radius: 7px;
  margin-left: 3px;
  background-color: rgb(252, 177, 177);
  &:hover{
    cursor: pointer;
    background-color: rgb(255, 129, 129);
  }
}

.admU{
  width: 30%;
  margin-top: 4px;
  height: 35px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover{
    background-color: rgb(211, 211, 211);
  }
}
.admP{
  width: 30%;
  margin-top: 4px;
  height: 35px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover{
    background-color: rgb(211, 211, 211);
  }
}

// estilos de carga
.loading{
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.loading .loader{
  width: 100px;
  height: 100px;
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
  font-size: 22px;
  position: absolute;
  color: #101e22;
  top: 46%;
  left: 50%;
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
// mensaje sin productos
.empty-products{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty-products p{
  position: fixed;
  top: 50%;
  font-size: 28px;
}
</style>