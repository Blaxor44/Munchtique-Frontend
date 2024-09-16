<script>
import { RouterLink } from "vue-router";

export default {
  methods: {
    toggleMenu() {
      this.$refs.menu.classList.toggle("active");
    },
    getIcons() {
      return [
        { index: 0, src: require('@/components/icons/pizza.png'), route: "Pizza" },
        { index: 1, src: "/src/components/icons/hamburger.png", route: "Burger" },
        { index: 2, src: "/src/components/icons/tortilla.png", route: "Wrap" },
        { index: 3, src: "/src/components/icons/hotdog.png", route: "Hotdog" },
        { index: 4, src: "/src/components/icons/frenchfries.png", route: "French Fries" },
        { index: 5, src: "/src/components/icons/steak.png", route: "Meat" },
        { index: 6, src: "/src/components/icons/sushi.png", route: "Sushi" },
        { index: 7, src: "/src/components/icons/fruit.png", route: "Fruit" },
        { index: 8, src: "/src/components/icons/dessert.png", route: "Dessert" },
        { index: 9, src: "/src/components/icons/cola.png", route: "Drink" }
      ];
    }
  },

  name: "MunchButton",
  components: {
    RouterLink
  }
};
</script>


<template>
  <div class="wrapper">
    <div class="menu" ref="menu">
      <div class="toggle" ref="toggle" @click="toggleMenu">
        <img src="/src/components/icons/donut2.png" />
      </div>
      <li v-for="icon in getIcons()" :key="icon.index" :style="{ '--i': icon.index }">
        <router-link :to="`/menu/${icon.route}`">
          <img :src="icon.src" />
        </router-link>
      </li>
    </div>
  </div>
</template>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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
  width: 40%;
  height: 40%;
  background: linear-gradient(45deg, #0f0e0e, #ff1252);
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
