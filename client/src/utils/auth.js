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
        if(isConfirmed){window.location = '/'}
       })
      )
    .catch (error => {
      window.alert("Algo ha salido mal :(")
      console.log(error);
    })
    
  },
  login(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "login", user);
  }
};