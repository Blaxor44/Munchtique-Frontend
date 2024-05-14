<script>
import axios from 'axios';

export default {
  data() {
    return {
      pizza: []
    };
  },
  mounted() {
    axios
      .get('@/src/data/food.json') // Adjust the path if necessary
      .then(response => {
        // Handle successful response
        this.pizza = response.data;
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div v-for="(item, index) in pizza" :key="index" class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
          <!-- Add pizza image if available -->
          <img v-if="item.image" :src="item.image" class="card-img-top" alt="Pizza Image">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <!-- Display pizza attributes -->
            <p v-if="item.type === 'Pizza'" class="card-text">
              Type: {{ item.type }}<br>
              Price: ${{ item.price }}<br>
              Toppings: {{ item.toppings.join(', ') }}
            </p>
            <!-- Add other attributes if needed -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Add custom CSS styles here */
</style>
