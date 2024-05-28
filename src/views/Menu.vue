<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      items: [],
      selectedCategory: 'All',
      categories: ['All', 'Burger', 'Pizza', 'Wrap', 'Hotdog', 'French Fries', 'Meat', 'Sushi', 'Fruit', 'Drink', 'Dessert']
    };
  },
  computed: {
    filteredItems() {
      if (this.selectedCategory === 'All') {
        return this.items; // Return all items if 'all' is selected
      } else {
        return this.items.filter(item => item.type === this.selectedCategory); // Filter items by selected category
      }
    }
  },
  mounted() {
    this.fetchItems(); // Call the fetchItems function on mount
  },
  methods: {
    ...mapActions(['addToCart']),
    fetchItems() {
      axios
        .get("/src/data/food.json") // Adjust the path if necessary
        .then(response => {
          this.items = response.data; // Store all items in the items array
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
  }
};
</script>



<template>
  <div class="container">
    <!-- Dropdown menu to select category -->
    <select v-model="selectedCategory" class="form-select mb-3" style="font-size: 22px;">
      <option v-for="category in categories" :value="category" style="font-size: 20px;">{{ category }}</option>
    </select>
    <div class="row justify-content-center">
      <div v-for="(item, index) in filteredItems" :key="index" class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 text-center">
          <!-- Add image if available -->
          <img v-if="item.image" :src="item.image" class="card-img-top img-fluid" alt="Food Image">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title mb-3" style="font-size: 1.5rem">{{ item.name }}</h5>
            <!-- Display food attributes -->
            <p class="card-text" style="font-size: 1.1rem">
              Type: {{ item.type }}<br>
              Price: ${{ item.price }}<br>
              <!-- Check if toppings/fillings/ingredients exist before displaying -->
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
              <span v-if="item.type === 'Description' && item.description">Description: {{ item.description }}</span>
              <!-- Add more conditions for other types if needed -->
            </p>
            <button class="btn btn-primary mt-auto" style="font-size: 1rem" @click="addToCart(item)">Add to
              Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style>
.img-fluid {
  max-width: 100%;
  height: 300px;
}

.container {
  padding: 20px;
}
</style>