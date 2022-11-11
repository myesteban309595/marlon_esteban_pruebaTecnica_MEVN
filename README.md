# marlon_esteban_pruebaTecnica_MEVN
prueba tecnica fullstack MEVN

# PRUEBA TECNICA DESARROLLADOR FULLSTACK

## Iniciando
 * para inicializar el proyecto ejecutamos:
    _npm i
    
## debes definir las variables de entorno en un archivo .env en la carpeta raiz, con informacion de la base de datos
  contraseñas, etc.
  
 *  PORT
 *  DB_CREDENTIALS_USER
 *  DB_CREDENTIALS_PASSWORD
 *  ADMIN_PASSWORD 
 *  JWT_SECRET
  
## ejecutar el cliente

   * accedemos a la carpeta "client", una vez situacion en la ruta, ejecutamos el siguiente script:
   ```bash
   npm run serve
   ````
  
## ejecutando el servidor

   * accedemos a la carpeta "server", una vez situacion en la ruta, ejecutamos el siguiente script:
    
    ```bash
    npm run dev
    ```
   
 ## Funciones
 
  ### Registro y Login
   
   * esta api tiene como objetivo poner en práctica el registro e inicio de sesion de un usuario, una vez autenticado
   se le asignará una credencia de autenticacion "token" mediante Jwt, encriptacion de contraseñas y las respectivas
   validaciones de la data.
   
  ### Administracion y operaciones CRUD de 
  
   * una vez autenticado e iniciado sesion, el usuario podrá crear, editar, actualizar y eliminar productos.
   
  #### Usuario administrador
   
  *  El usuario administrador tendrá accesos especiales, que le permiten administrar los productos, y gestionar los 
   usuarios que se encuentran registrados en la base de datos. Para ingresar con el usuario administrado :
   
   *Admin
   ```bash
    email: maryoe_95@hotmail.com
    password : admin1234
   ```
* para visualizar la API desplegada ingresa a : [API DEPLOY](https://musical-wisp-5ea302.netlify.app/)
    
    
   
  
  
 
  
  
  
