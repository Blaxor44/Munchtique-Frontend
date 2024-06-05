<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Import useStore hook to access the Vuex store

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore(); // Access the Vuex store

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5173/api/users/login', {
          email: email.value,
          password: password.value,
        });

        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);

        // Dispatch the setUser action with the user data
        store.dispatch('setUser', response.data.user);

        // Redirect to a protected route, e.g., dashboard
        router.push('/dashboard');
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
              <div class="mb-md-5 mt-md-4 pb-5">
                <p class="navbar-brand" href="#">
                  <img src="/src/components/icons/donut2.png" alt="Logo" class="h-12" width="75" height="75" />
                </p>
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Please enter your email and password!</p>

                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input type="email" id="typeEmailX" class="form-control form-control-lg" v-model="email" />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX" class="form-control form-control-lg" v-model="password" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>

                <p class="small mb-5 pb-lg-2">
                  <a class="text-white-50" href="#!">Forgot password?</a>
                </p>

                <button @click="handleSubmit" data-mdb-button-init data-mdb-ripple-init
                  class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="#!" class="text-white">
                    <i class="fab fa-facebook-f fa-lg"></i>
                  </a>
                  <a href="#!" class="text-white">
                    <i class="fab fa-twitter fa-lg mx-4 px-2"></i>
                  </a>
                  <a href="#!" class="text-white">
                    <i class="fab fa-google fa-lg"></i>
                  </a>
                </div>
              </div>

              <div>
                <p class="mb-0">
                  Don't have an account?
                  <router-link to="/signup" class="text-white-50 fw-bold">Sign Up</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gradient-custom {
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
}
</style>
