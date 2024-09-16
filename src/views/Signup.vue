<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <p class="navbar-brand">
                  <img src="/public/icons/donut2.png" alt="Logo" class="h-12" width="75" height="75" />
                </p>
                <h2 class="fw-bold mb-2 text-uppercase">Sign up</h2>
                <p class="text-white-50 mb-5">Create your account</p>

                <!-- Full Name Input -->
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="fullName" type="text" id="typeFullNameX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeFullNameX">Full Name</label>
                </div>

                <!-- Email Input -->
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="email" type="email" id="typeEmailX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <!-- Username Input -->
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="username" type="text" id="typeUsernameX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeUsernameX">Username</label>
                </div>

                <!-- Phone Input -->
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="phone" type="text" id="typePhoneX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePhoneX">Mobile Phone</label>
                </div>

                <!-- Password Input -->
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>

                <!-- Repeat Password Input -->
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="repeatPassword" @input="validatePasswords" type="password" id="typeRepeatPasswordX"
                    class="form-control form-control-lg" />
                  <label class="form-label" for="typeRepeatPasswordX">Repeat Password</label>
                  <p v-if="passwordError" class="text-danger mt-1">Passwords do not match.</p>
                </div>

                <!-- Submit Button -->
                <button @click="handleSubmit" data-mdb-button-init data-mdb-ripple-init
                  class="btn btn-outline-light btn-lg px-5" type="submit">Sign Up</button>
              </div>

              <div>
                <p class="mb-0">Already have an account? <router-link to="/login"
                    class="text-white-50 fw-bold">Login</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const repeatPassword = ref('');
    const fullName = ref(''); // New field: Full Name
    const phone = ref('');    // New field: Mobile Phone
    const passwordError = ref(false);
    const router = useRouter();

    const validatePasswords = () => {
      passwordError.value = password.value !== repeatPassword.value;
    };

    const handleSubmit = async () => {
      validatePasswords();
      if (!passwordError.value) {
        try {
          const response = await axios.post('http://localhost:5000/api/users/register', {
            email: email.value,
            username: username.value,
            password: password.value,
            fullName: fullName.value, // Send full name to backend
            phone: phone.value      // Send phone number to backend
          });

          if (response.status === 201) {
            alert('Signup successful! Please login.');
            router.push('/login');
          } else {
            alert('Error signing up. Please try again.');
          }
        } catch (error) {
          console.error('Error signing up:', error);
          alert('Error signing up. Please try again.');
        }
      }
    };

    return {
      email,
      username,
      password,
      repeatPassword,
      fullName,
      phone,
      passwordError,
      validatePasswords,
      handleSubmit,
    };
  },
};
</script>

<style>
/* Your existing styles */
</style>


<style></style>