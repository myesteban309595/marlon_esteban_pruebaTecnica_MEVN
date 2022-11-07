<template>
    <div class="home">
        <h1>HOLA DESDE HOME PAGE</h1>
    </div>
</template>

<script>
import NavigationBar from "./components/Navigation";
export default {
  name: "App",
  components: {
    navigation: NavigationBar
  }
};

</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #e0ddda;
  width: 100%;
  height: 100%;
}
</style>