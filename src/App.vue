<script>
import Navbar from "./components/Navbar.vue";

export default {
  methods: {
    toggleMenu() {
      // Toggle the 'active' class of the menu
      this.$refs.menu.classList.toggle("active");
    },
  },
  components: { Navbar },
};
</script>

<template>
  <Navbar />
  <div class="menu" ref="menu">
    <div class="toggle" ref="toggle" @click="toggleMenu">
      <img src="\src\components\icons\scooter.png" />
    </div>
    <li style="--i: 0">
      <a href="#"><img src="\src\components\icons\pizza.png" /></a>
    </li>
    <li style="--i: 1">
      <a href="#"><img src="\src\components\icons\hamburger.png" /></a>
    </li>
    <li style="--i: 2">
      <a href="#"><img src="\src\components\icons\tortilla.png" /></a>
    </li>
    <li style="--i: 3">
      <a href="#"><img src="\src\components\icons\hotdog.png" /></a>
    </li>
    <li style="--i: 4">
      <a href="#"><img src="\src\components\icons\frenchfries.png" /></a>
    </li>
    <li style="--i: 5">
      <a href="#"><img src="\src\components\icons\steak.png" /></a>
    </li>
    <li style="--i: 6">
      <a href="#"><img src="\src\components\icons\sushi.png" /></a>
    </li>
    <li style="--i: 7">
      <a href="#"><img src="\src\components\icons\fruit.png" /></a>
    </li>
    <li style="--i: 8">
      <a href="#"><img src="\src\components\icons\dessert.png" /></a>
    </li>
    <li style="--i: 9">
      <a href="#"><img src="\src\components\icons\cola.png" /></a>
    </li>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #ff1252, #0f0e0e);
}
.menu {
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu li {
  position: absolute;
  left: 0;
  list-style: none;
  transform-origin: 250px;
  transition: 0.5s;
  transition-delay: calc(0.1s * var(--i));
  transform: rotate(0deg) translateX(210px);
}

.menu.active li {
  transform: rotate(calc(360deg / 10 * var(--i)));
}
.menu li a {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(calc(360deg / -10 * var(--i)));
  transition: 0.5s;
}
.menu li a:hover {
  transform: scale(1.5);
}

.toggle {
  position: absolute;
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #ff1252, #0f0e0e);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  font-size: 2em;
  transition: transform 1.2s;
}

.menu.active .toggle {
  transform: rotate(360deg);
}
</style>
