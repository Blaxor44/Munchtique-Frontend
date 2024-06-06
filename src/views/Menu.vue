<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      items: [],
      categories: ['All', 'Burger', 'Pizza', 'Wrap', 'Hotdog', 'French Fries', 'Meat', 'Sushi', 'Fruit', 'Drink', 'Dessert']
    };
  },
  computed: {
    selectedCategory() {
      return this.$route.params.category || 'All';
    },
    filteredItems() {
      if (this.selectedCategory === 'All') {
        return this.items;
      } else {
        return this.items.filter(item => item.type === this.selectedCategory);
      }
    }
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    ...mapActions(['addToCart']),
    fetchItems() {
      axios
        .get("/src/data/food.json")
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  },
  watch: {
    // Watch for changes in the route and refetch items if necessary
    '$route.params.category': 'fetchItems'
  }
};
</script>

<template>
  <div class="container">
    <div class="category-buttons mb-3 d-flex justify-content-center">
      <router-link v-for="category in categories" :key="category" :to="`/menu/${category === 'All' ? '' : category}`"
        class="btn category-btn">
        {{ category }}
      </router-link>
    </div>
    <div class="row justify-content-center">
      <div v-for="(item, index) in filteredItems" :key="index" class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 text-center">
          <img v-if="item.image" :src="item.image" class="card-img-top img-fluid" alt="Food Image">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title mb-3" style="font-size: 1.5rem">{{ item.name }}</h5>
            <p class="card-text" style="font-size: 1.1rem">
              Type: {{ item.type }}<br>
              Price: {{ item.price }}€<br>
              <span v-if="item.type === 'Pizza' && item.toppings">Toppings: {{ item.toppings.join(', ') }}</span>
              <span v-if="item.type === 'Burger' && item.topping">Topping: {{ item.topping }}</span>
              <span v-if="item.type === 'Wrap' && item.fillings">Fillings: {{ item.fillings.join(', ') }}</span>
              <span v-if="item.type === 'Hotdog' && item.toppings">Toppings: {{ item.toppings.join(', ') }}</span>
              <span v-if="item.type === 'French Fries' && item.toppings">Toppings: {{ item.toppings.join(', ') }}</span>
              <span v-if="item.type === 'Meat' && item.description">Description: {{ item.description }}</span>
              <span v-if="item.type === 'Sushi' && item.ingredients">Ingredients: {{ item.ingredients.join(', ')
                }}</span>
              <span v-if="item.type === 'Fruit' && item.description">Description: {{ item.description }}</span>
              <span v-if="item.type === 'Drink' && item.description">Description: {{ item.description }}</span>
              <span v-if="item.type === 'Dessert' && item.description">Description: {{ item.description }}</span>
            </p>
            <button class="btn btn-warning mt-auto" style="font-size: 1rem" @click="addToCart(item)">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>







<style>
.img-fluid {
  max-width: 100%;
  height: 200px;
  /* Adjusted to fit the style */
  object-fit: cover;
}

.container {
  padding: 20px;
}

.card {
  background-color: #343a40;
  /* Dark gray background color */
  color: #fff;
  /* White text color */
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  color: #fff;
  /* White text color */
}

.card-text {
  font-size: 1rem;
}

.btn-warning {
  background-color: #ffc107;
  border: none;
  color: black;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  /* Center the buttons */
}

.category-btn {
  background-color: #343a40;
  border: 1px solid #ddd;
  color: #fff;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.category-btn:hover {
  background-color: #e9ecef;
}

.category-btn.active {
  background-color: #007bff;
  color: #fff;
}

.btn-warning .fas {
  margin-right: 5px;
  /* Add some space between the icon and the text */
}
</style>
