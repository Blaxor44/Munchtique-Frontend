<script>
import { RouterLink } from "vue-router";

export default {
    methods: {
        toggleMenu() {
            this.$refs.menu.classList.toggle("active");
        },
        getIcons() {
            return [
                { index: 0, src: "/public/icons/pizza.png", route: "pizza" },
                {
                    index: 1,
                    src: "/public/icons/hamburger.png",
                    route: "hamburger",
                },
                {
                    index: 2,
                    src: "/public/icons/tortilla.png",
                    route: "tortilla",
                },
                { index: 3, src: "/public/icons/hotdog.png", route: "hotdog" },
                {
                    index: 4,
                    src: "/public/icons/frenchfries.png",
                    route: "frenchfries",
                },
                { index: 5, src: "/public/icons/steak.png", route: "steak" },
                { index: 6, src: "/public/icons/sushi.png", route: "sushi" },
                { index: 7, src: "/public/icons/fruit.png", route: "fruit" },
                {
                    index: 8,
                    src: "/public/icons/dessert.png",
                    route: "dessert",
                },
                { index: 9, src: "/public/icons/cola.png", route: "cola" },
            ];
        },
    },

    name: "MunchButton",
    components: {
        RouterLink,
    },
};
</script>

<template>



    <div class="container">
        <div class="left-piece">
            <div class="menu" ref="menu">
                <div class="toggle" ref="toggle" @click="toggleMenu">
                    <img src="/public/icons/scooter.png" />
                </div>
                <li v-for="icon in getIcons()" :key="icon.index" :style="{ '--i': icon.index }">
                    <router-link :to="`/${icon.route}`">
                        <img :src="icon.src" />
                    </router-link>
                </li>
            </div>
        </div>
        <div class="right-pieces">
            <div class="top-right-piece">Top Right Piece</div>
            <div class="bottom-right-piece">Bottom Right Piece</div>
        </div>
    </div>
</template>



<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(90deg, #ff1252, #0f0e0e);
}

.menu {
    position: relative;
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    /* Ensure some space between the menu and container */
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

.container {
    display: flex;
    border: 1px solid #ccc;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 800px;
    height: 400px;
}

.left-piece {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8b400;
    color: #fff;
    font-size: 24px;
    border-right: 1px solid #ccc;
}

.right-pieces {
    flex: 2;
    display: flex;
    flex-direction: column;
}

.top-right-piece,
.bottom-right-piece {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 24px;
    border-bottom: 1px solid #ccc;
}

.top-right-piece {
    background-color: #4caf50;
    border-bottom: 1px solid #ccc;
}

.bottom-right-piece {
    background-color: #2196f3;
}
</style>
