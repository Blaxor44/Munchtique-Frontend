<template>
    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
                            <p class="navbar-brand">
                                <img src="/src/components/icons/donut2.png" alt="Logo" class="h-12" width="75"
                                    height="75" />
                            </p>
                            <h2 class="fw-bold mb-2 text-uppercase">Checkout</h2>
                            <p class="text-white-50 mb-5">Please enter your delivery and payment details</p>

                            <!-- Full Name Input -->
                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <input type="text" v-model="fullName" class="form-control form-control-lg" />
                                <label class="form-label">Full Name</label>
                            </div>

                            <!-- Email Input -->
                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <input type="email" v-model="email" class="form-control form-control-lg" />
                                <label class="form-label">Email</label>
                            </div>

                            <!-- Phone Input -->
                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <input type="text" v-model="phone" class="form-control form-control-lg" />
                                <label class="form-label">Phone</label>
                            </div>

                            <!-- Address Input -->
                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <input type="text" v-model="address" class="form-control form-control-lg" />
                                <label class="form-label">Address</label>
                            </div>

                            <!-- City Input -->
                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <input type="text" v-model="city" class="form-control form-control-lg" />
                                <label class="form-label">City</label>
                            </div>

                            <!-- Postal Code Input -->
                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <input type="text" v-model="postalCode" class="form-control form-control-lg" />
                                <label class="form-label">Postal Code</label>
                            </div>

                            <!-- Pay with Card -->
                            <div class="form-check form-switch mb-4">
                                <input class="form-check-input" type="checkbox" v-model="payWithCard"
                                    @change="clearCardDetails" />
                                <label class="form-check-label">Pay with Card</label>
                            </div>

                            <!-- Card Details -->
                            <div v-if="payWithCard">
                                <div data-mdb-input-init class="form-outline form-white mb-4">
                                    <input type="text" v-model="cardNumber" @input="formatCardNumber"
                                        class="form-control form-control-lg" />
                                    <label class="form-label">Card Number</label>
                                </div>

                                <div data-mdb-input-init class="form-outline form-white mb-4">
                                    <input type="text" v-model="expiryDate" @input="formatExpiryDate"
                                        class="form-control form-control-lg" />
                                    <label class="form-label">Expiry Date (MM/YY)</label>
                                </div>

                                <div data-mdb-input-init class="form-outline form-white mb-4">
                                    <input type="text" v-model="cvv" @input="formatCVV"
                                        class="form-control form-control-lg" />
                                    <label class="form-label">CVV</label>
                                </div>
                            </div>

                            <button @click="handleSubmit" data-mdb-button-init data-mdb-ripple-init
                                class="btn btn-outline-light btn-lg px-5" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: 'Checkout',
    setup() {
        const store = useStore();
        const router = useRouter();

        // Define reactive variables for form inputs
        const fullName = ref(store.state.user ? store.state.user.fullName : '');
        const email = ref(store.state.user ? store.state.user.email : '');
        const phone = ref(store.state.user ? store.state.user.phone : '');
        const address = ref('');
        const city = ref('');
        const postalCode = ref('');
        const payWithCard = ref(false);
        const cardNumber = ref('');
        const expiryDate = ref('');
        const cvv = ref('');

        const cartItems = computed(() => store.getters.cartItems);
        const totalPrice = computed(() => store.getters.totalPrice);

        // Function to clear card details when not paying with card
        const clearCardDetails = () => {
            if (!payWithCard.value) {
                cardNumber.value = '';
                expiryDate.value = '';
                cvv.value = '';
            }
        };

        // Functions to format card number, expiry date, and CVV input fields
        const formatCardNumber = (event) => {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length > 16) {
                value = value.slice(0, 16);
            }
            const formattedValue = value.match(/.{1,4}/g)?.join(' ');
            cardNumber.value = formattedValue || '';
        };

        const formatExpiryDate = (event) => {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length > 4) {
                value = value.slice(0, 4);
            }
            const formattedValue = value.match(/.{1,2}/g)?.join('/');
            expiryDate.value = formattedValue || '';
        };

        const formatCVV = (event) => {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length > 3) {
                value = value.slice(0, 3);
            }
            cvv.value = value;
        };

        // Function to handle form submission
        const handleSubmit = async () => {
            const payload = {
                fullName: fullName.value,
                email: email.value,
                phone: phone.value,
                address: address.value,
                city: city.value,
                postalCode: postalCode.value,
                paymentMethod: payWithCard.value ? 'card' : 'cash',
                cardDetails: payWithCard.value ? { cardNumber: cardNumber.value, expiryDate: expiryDate.value, cvv: cvv.value } : null,
                items: cartItems.value.map(item => ({
                    name: item.name,
                    price: item.price,
                })),
                totalPrice: totalPrice.value,
            };

            console.log('Payload:', payload); // Debugging: log the payload to ensure all fields are populated correctly

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return; // Stop execution if the token is missing
                }
                const response = await axios.post('http://localhost:5000/api/checkout', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    await store.dispatch('clearCart');
                    localStorage.setItem('cart', JSON.stringify([]));
                    alert('Order placed successfully!');
                    router.push('/thankyou');
                } else {
                    alert('Error placing order. Please try again.');
                }
            } catch (error) {
                console.error('Error placing order:', error);
                alert('Error placing order. Please try again.');
            }
        };

        return {
            fullName,
            email,
            phone,
            address,
            city,
            postalCode,
            payWithCard,
            cardNumber,
            expiryDate,
            cvv,
            handleSubmit,
            clearCardDetails,
            formatCardNumber,
            formatExpiryDate,
            formatCVV,
            cartItems,
            totalPrice,
        };
    },
};
</script>

<style scoped>
/* Add custom styling here if needed */
</style>