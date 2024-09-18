<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore();

    // Check if the user is already logged in and redirect to home
    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/'); // Redirect to home if logged in
      }
    });

    const handleSubmit = async () => {
      try {
        console.log('Submitting login...');
        const response = await axios.post('https://munchrestapi.onrender.com/users/login', {
          email: email.value,
          password: password.value,
        });

        console.log('Login response:', response);

        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);

        // Dispatch the setUser action with the user data
        await store.dispatch('setUser', response.data.user);

        // Check if token is stored correctly
        console.log('Token stored:', localStorage.getItem('token'));

        // Redirect to home page
        router.push('/').catch(err => console.error('Redirection error:', err));
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Invalid credentials');
      }
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <p class="navbar-brand">
                <img src="/icons/donut2.png" alt="Logo" class="h-12" width="75" height="75" />
              </p>
              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Please enter your email and password!</p>

              <div class="form-outline form-white mb-4">
                <input type="email" class="form-control form-control-lg" v-model="email" />
                <label class="form-label">Email</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password" class="form-control form-control-lg" v-model="password" />
                <label class="form-label">Password</label>
              </div>

              <button @click="handleSubmit" class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

              <p class="mb-0 mt-3">
                Don't have an account?
                <router-link to="/signup" class="text-white-50 fw-bold">Sign Up</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* Add any necessary styling here */
</style>
