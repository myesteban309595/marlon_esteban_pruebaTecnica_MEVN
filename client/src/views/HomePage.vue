<template>
    <div class="home">
      <div>
        <ServicesNavBar token/>
      </div>

      <div class="container-pages">
        <div v-if="adminUser" class="page-left">
          <UsersTableData/>
          <button @click="adminP" class="admP" >Administrar Productos</button>
        </div>
        <div v-if="adminUser==null" class="page-left">
          <CreateProduct :update="updateProps" @escucharHijo="getProduct()"></CreateProduct>
          <button @click="adminU" class="admU">Administrar Usuarios</button>
        </div>
        <div class="page-right">
          <div class="scroll-principal">   
            <AwesomeVueStarRating :star="this.star" :disabled="this.disabled" :maxstars="this.maxstars" :starsize="this.starsize" :hasresults="this.hasresults" :hasdescription="this.hasdescription" :ratingdescription="this.ratingdescription"/>
           <div class="products-container" v-for="(product,index) in products" :key="index">
             <div class="productCard">
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
    <input  id="radio11" type="radio" name="estrellas" value="5">
    <label v-if="(product.qualification == 1)" for="radio11">★</label>
    <input  id="radio22" type="radio" name="estrellas" value="4">
    <label  for="radio22">★</label>
    <input  id="radio33" type="radio" name="estrellas" value="3">
    <label  for="radio33">★</label>
    <input  id="radio44" type="radio" name="estrellas" value="2">
    <label  for="radio44">★</label>
    <input  id="radio55" type="radio" name="estrellas" value="1">
    <label   for="radio55">★</label>
  </p>
              </div>
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
         adminUser : null
       }
    },
    created(){
      this.getProduct()
    },
    methods:{
      getProduct(){
        axios.get('http://localhost:4040/product/allProducts')
        //.then(res => console.log(res))
        .then(data=> {
          this.products = data.data.reverse()
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
          axios.delete('http://localhost:4040/product/deleteproduct/'+id)
        .then(data=> {
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado'
            )
          this.getProduct();
          console.log("eliminar:",data);
        })
        .catch(error=> {
          console.log(error);
        })
        }
       })
      },
      adminU(){
        this.adminUser = true;
      },
      adminP(){
        this.adminUser = null;
      }
   }
}
</script>

<style lang="scss" scoped>


.star {
  width: 40px;
    color: red;
  }
  .star.active {
    width: 40px;
    color: red;
  }
  .list, .list.disabled {
    &:hover {
      .star {
        color: red !important;
      }
      .star.active {
        width: 40px;
        color: red;
      }
    }
  }

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
}

.clasificacion {
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
  background: linear-gradient(to right, #d4dbe0, #a8b6c5);
}
.scroll-principal{
  margin-top: 15px;
  height: 480px;
 overflow-y: scroll;
}
.container-pages{
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
  width: 300px;
  height: 380px;
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
  background-color: rgb(98, 98, 255);
  &:hover{
    cursor: pointer;
    background-color: rgb(72, 72, 253);
  }
}
#delete{
  border-radius: 7px;
  margin-left: 3px;
  background-color: rgb(252, 138, 138);
  &:hover{
    cursor: pointer;
    background-color: rgb(250, 109, 109);
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
</style>