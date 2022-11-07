<template>
    <ul class="navigation-bar">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
      <li>
        <router-link to="/register">Register</router-link>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: "NavigationBar"
  };
  </script>
  
  <style scoped>
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    display: inline-block;
    padding: 1em 5.5em;
  }

  .navigation-bar {
    margin-top: 0%;
    background-color: cadetblue;
  }
  </style>