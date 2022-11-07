<template>
    <div class="navbar-services" >
        <p>BIENVENIDO {{"USUARIO"}}</p>
        <button class="logout-button">log-Out</button>
    </div>
</template>

<style scoped>
.navbar-services{
  background-color: aquamarine;
  padding:5px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.logout-button{
    width: 120px;
    height: 45px;
}
</style>