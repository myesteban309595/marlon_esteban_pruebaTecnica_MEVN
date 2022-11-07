<template>
    <div class="home">
      <div>
        <ServicesNavBar/>
      </div>
      <div class="body-home">
        <h1>HOLA DESDE HOME PAGE</h1>
      </div>
    </div>
</template>

<script>
import ServicesNavBar from '@/components/ServicesNavBar.vue';

export default {
    name: "App",
    components: { 
      ServicesNavBar 
    }
};

</script>

<style>
.home{
  width: 100%;
}

</style>