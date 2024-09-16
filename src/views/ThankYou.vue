<template>
    <div class="container py-5">
        <div class="card text-center">
            <div class="card-body">
                <img src="/icons/donut2.png" alt="Success Icon" class="mb-4" width="100" height="100">
                <h2 class="card-title mb-4">Thank You for Your Order!</h2>
                <p class="card-text">Your order has been successfully placed.</p>
                <router-link :to="{ path: '/' }" class="btn btn-primary">Back to Home</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ThankYou'
};
</script>

<style scoped>
/* Add custom styling here if needed */
</style>