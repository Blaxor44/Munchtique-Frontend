<template>
    <div class="cart-container">
        <h2 class="cart-title">Your Cart</h2>
        <ul class="cart-list">
            <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
                <div class="item-info">
                    <img :src="item.image" alt="Item Image" class="item-image">
                    <div class="item-details">
                        <h3>{{ item.name }}</h3>
                        <p class="price">Price: ${{ item.price.toFixed(2) }}</p>
                    </div>
                </div>
                <button @click="handleRemoveFromCart(index)" class="remove-button">Remove</button>
            </li>
        </ul>
        <!-- Discount code input field -->
        <div class="discount-input">
            <label for="discount">Discount Code:</label>
            <input type="text" id="discount" v-model="discountCode" class="discount-input-field">
            <button class="btn btn-primary" @click="applyDiscountCode">Apply</button>
        </div>

        <div class="total-container">
            <h3 class="total-price">Total: ${{ totalPrice.toFixed(2) }}</h3>
            <router-link to="/checkout" class="checkout-button">Checkout</router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            discountCode: ''
        };
    },

    computed: {
        ...mapGetters(['cartItems', 'totalPrice'])
    },

    methods: {
        ...mapActions(['removeFromCart', 'applyDiscount']),
        handleRemoveFromCart(index) {
            this.removeFromCart(index);
        },
        async applyDiscountCode() {
            const isApplied = await this.applyDiscount(this.discountCode);

            if (isApplied) {
                alert('Code successfully applied.');
            } else {
                alert('Invalid code or code already applied.');
            }
            this.discountCode = ''; // Clear discount code field after applying
        }
    }
};
</script>

<style>
.cart-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
}

.cart-list {
    list-style: none;
    padding: 0;
}

.cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.item-info {
    display: flex;
    align-items: center;
}

.item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 20px;
    border-radius: 8px;
}

.item-details {
    flex: 1;
}

.item-details h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.price {
    font-size: 16px;
    color: #777;
    margin-top: 5px;
}

.remove-button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.remove-button:hover {
    background-color: #c82333;
}

.total-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.total-price {
    font-size: 20px;
    color: #333;
}

.checkout-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.checkout-button:hover {
    background-color: #0056b3;
}

/* Discount input field styles */
.discount-input {
    margin-top: 20px;
}

.discount-input label {
    margin-right: 10px;
}

.discount-input-field {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
}

.discount-input button {
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.discount-input button:hover {
    background-color: #0056b3;
}
</style>
