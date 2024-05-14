<script></script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/menu">Menu</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Signup</router-link>
    <router-link to="/pizza">Pizza</router-link>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
