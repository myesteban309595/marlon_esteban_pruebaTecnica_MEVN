import axios from "axios";
import Cookies from "js-cookie";
import swal from 'sweetalert2';

const ENDPOINT_PATH = "http://localhost:4040";

export default {
   setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  // getAllProducts(){
  //   return axios.get(`${ENDPOINT_PATH}/product/allproducts`)
  //   .then()
  //   .catch(()=>{

  //   })
  // },
  // getMyProducts(){

  // },
  addProduct(name, price, qualification, url){
    const product = {name, price, qualification, url}
    console.log(product);
    return axios.post(`${ENDPOINT_PATH}/product/createProduct`, product)
    .then(
      swal.fire("Se ha añadido un Nuevo producto")
    )
    .catch(error=> {
      console.log(error);
    })
  },
  register(name, lastName,email, password) {
    const user = { name, lastName,email, password };
    console.log(user);
    return axios.post(`${ENDPOINT_PATH}/user/registrar`, user)
    .then(
      swal.fire({
        title: "Registrado correctamente",
        confirmButtonText: "¡ Genial !",
        confirmButtonColor: "#3085d6",
      }).then(({isConfirmed})=> {
        if(isConfirmed){
          this.$router.push("/");
        }
       })
      )
    .catch (error => {
      window.alert("Algo ha salido mal :(")
      console.log(error);
    })
    
  },
  async login(email, password) {
    const user = { email, password };
    return await axios.post(`${ENDPOINT_PATH}/login`, user)
    .then(data => {
      const token = data.data.token
      console.log("token:", token);
      console.log("data recibida del back:", data.status);
      Cookies.set("accessToken", token);
      //bienvenido usuario admin
    })
    .catch(error=> {
      console.log("errorLogin:", error);
      swal.fire(error.response.data)
    })
  }
};