<script>
import { useStore } from 'vuex'; // Import useStore hook to access the Vuex store
import items from '@/data/food.json';

export default {
  name: "Navbar",
  data() {
    return {
      searchQuery: '',
      allItems: items, // Assign the imported JSON data to allItems
      filteredItems: [], // Initialize filteredItems as empty array
      showItems: false // Flag to control visibility of items
    };
  },
  methods: {
    handleLogout() {
      // Dispatch the logout action
      this.$store.dispatch('logout');
    },
    navigateToCategory(category) {
      // Capitalize the first letter and convert the rest to lowercase
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

      // Navigate to the corresponding category page using Vue Router
      this.$router.push({ name: 'Menu', params: { category: formattedCategory } });
    },
  },
  computed: {
    shouldShowNavbar() {
      const excludedRoutes = ['/login', '/signup'];
      const currentPath = this.$route.path;
      return !excludedRoutes.includes(currentPath);
    }
  },
  watch: {
    searchQuery() {
      // Filter items based on the search query
      this.filteredItems = this.allItems.filter(item =>
        item.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())
      );

      // Toggle the visibility of items based on the search query
      this.showItems = this.searchQuery !== '';
    }
  }
};
</script>

<template>
  <nav v-if="shouldShowNavbar" class="navbar navbar-expand-lg navbar-light bg-light fixed-top" style="height: 70px">
    <div class="container">
      <router-link to="/">
        <img src="\src\components\icons\donut2.png" alt="Logo" class="h-12" width="55" height="55" />
      </router-link>
      <span> Munchtique</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container">
        <!-- Search form -->
        <form class="input-group mx-auto mb-3" style="width: 400px">
          <input type="search" class="form-control" placeholder="Munch..?" aria-label="Search" v-model="searchQuery" />
          <button class="btn btn-outline-primary" type="button" data-mdb-ripple-color="dark"
            style="padding: 0.45rem 1.5rem 0.35rem">
            Search
          </button>
        </form>
        <!-- List of items -->
        <ul class="list-group mx-auto" v-if="searchQuery !== ''">
          <li v-for="(item, index) in filteredItems" :key="index" class="list-group-item list-group-item-action"
            @click="navigateToCategory(item.type)">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <img v-if="item.image" :src="item.image" alt="Food Image" class="img-fluid" style="max-height: 50px;" />
                <span class="ms-2">{{ item.name }}</span>
              </div>
              <span>{{ item.price }}€</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="font-size: 18px">

          <li class="nav-item">
            <router-link class="nav-link active d-flex flex-column text-center" aria-current="page" to="/">
              <i class="fas fa-home fa-lg"></i>
              <span class="small">Home</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex flex-column text-center" aria-current="page" to="/menu">
              <i class="fas fa-user-friends fa-lg"></i>
              <span class="small">Menu</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex flex-column text-center" aria-current="page" to="/login">
              <i class="fas fa-briefcase fa-lg"></i>
              <span class="small">Login</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex flex-column text-center" aria-current="page" to="/signup">
              <i class="fas fa-comment-dots fa-lg"></i>
              <span class="small">Signup</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex flex-column text-center" aria-current="page" to="/cart">
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
  background-color: #1a1a1a;
  padding: 1rem 0;
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
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.list-group-item img {
  border-radius: 50%;
}
</style>
