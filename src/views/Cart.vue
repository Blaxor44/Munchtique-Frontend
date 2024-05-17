<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters(['cartItems', 'totalPrice'])
    },

    methods: {
        ...mapActions(['removeFromCart', 'clearNotification']),
        handleRemoveFromCart(index) {
            this.removeFromCart(index);
        }
    }
};
</script>

<template>
    <div class="cart-container">
        <h2 class="cart-title">Cart</h2>
        <ul class="cart-list">
            <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
                <span>{{ item.name }} - ${{ item.price.toFixed(2) }}</span>
                <button @click="handleRemoveFromCart(index)" class="remove-button">Remove</button>
            </li>
        </ul>
        <h3 class="total-price">Total: ${{ totalPrice.toFixed(2) }}</h3>
    </div>
</template>

<style scoped>
.cart-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #343a40;
}

.cart-list {
    list-style-type: none;
    padding: 0;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #dee2e6;
}

.cart-item:last-child {
    border-bottom: none;
}

.remove-button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.remove-button:hover {
    background-color: #c82333;
}

.total-price {
    text-align: center;
    margin-top: 20px;
    font-size: 1.5rem;
    color: #343a40;
}

@media (max-width: 768px) {
    .cart-container {
        padding: 10px;
    }

    .cart-title {
        font-size: 1.5rem;
    }

    .total-price {
        font-size: 1.2rem;
    }
}
</style>