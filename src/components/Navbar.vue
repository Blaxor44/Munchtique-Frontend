<script>
import { useStore } from 'vuex';
import items from '@/data/food.json';

export default {
  name: "Navbar",
  data() {
    return {
      searchQuery: '',
      allItems: items,
      filteredItems: [],
      showItems: false
    };
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout');
    },
    navigateToCategory(category) {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      this.$router.push({ name: 'Menu', params: { category: formattedCategory } });
      this.searchQuery = '';
    }
  },
  computed: {
    shouldShowNavbar() {
      const excludedRoutes = [];
      const currentPath = this.$route.path;
      return !excludedRoutes.includes(currentPath);
    }
  },
  watch: {
    searchQuery() {
      const query = this.searchQuery.toLowerCase();
      this.filteredItems = this.allItems.filter(item =>
        item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)
      );
      this.showItems = this.searchQuery !== '';
    }
  }
};
</script>



<template>
  <nav v-if="shouldShowNavbar" class="navbar navbar-expand-lg navbar-light bg-light fixed-top" style="height: 70px">
    <div class="container">
      <router-link to="/" class="logo-link">
        <img src="\src\components\icons\donut2.png" alt="Logo" class="h-12" width="55" height="55" />
      </router-link>
      <span>
        <h3>Munchtique</h3>
      </span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container">
        <form class="input-group mx-auto mb-3" style="width: 400px; margin-top: 20px;">
          <input type="search" class="form-control" placeholder="Munch..?" aria-label="Search" v-model="searchQuery" />
        </form>
        <ul class="list-group mx-auto position-absolute karte" v-if="searchQuery !== ''">
          <li v-for="(item, index) in filteredItems" :key="index" class="list-group-item list-group-item-action"
            @click="navigateToCategory(item.type)">
            <div class="d-flex align-items-center list-item-content">
              <img v-if="item.image" :src="item.image" alt="Food Image" class="item-image" />
              <span class="item-name ms-2">{{ item.name }}</span>
              <span class="item-price ms-auto">{{ item.price }}€</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="font-size: 18px">
          <li class="nav-item">
            <router-link class="nav-link exact-active d-flex flex-column text-center" to="/">
              <i class="fas fa-home fa-lg"></i>
              <span class="small">Home</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link exact-active d-flex flex-column text-center" to="/menu">
              <i class="fas fa-user-friends fa-lg"></i>
              <span class="small">Menu</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link exact-active d-flex flex-column text-center" to="/login">
              <i class="fas fa-briefcase fa-lg"></i>
              <span class="small">Login</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link exact-active d-flex flex-column text-center" to="/signup">
              <i class="fas fa-comment-dots fa-lg"></i>
              <span class="small">Signup</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link exact-active d-flex flex-column text-center" to="/cart">
              <i class="fas fa-bell fa-lg"></i>
              <span class="small">Cart</span>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"
              role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/src/components/icons/profile.png" class="rounded-circle" height="30" alt="" loading="lazy" />
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link to="/profile" class="dropdown-item">My Profile</router-link>
              </li>
              <li>
                <button @click="handleLogout" class="dropdown-item">Logout</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>



<style>
.navbar-fixed-top {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
}

.navbar-brand {
  font-size: unset;
  height: 3.5rem;
}

/* Style for the list items */
.list-group-item {
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  padding: 10px;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.item-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.item-name {
  flex-grow: 1;
  margin-left: 10px;
}

.item-price {
  white-space: nowrap;
}

.karte {
  top: 100%;
  left: 46.8%;
  transform: translateX(-50%);
  z-index: 1000;
  border: 2px solid #343a40;
}

.navbar .router-link-exact-active:not(.logo-link) {
  font-weight: bold;
  color: #007bff;
  border-bottom: 2px solid #007bff;
}
</style>
