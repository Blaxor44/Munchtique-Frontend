<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      passwordError: false
    };
  },
  methods: {
    validatePasswords() {
      if (this.password !== this.repeatPassword || this.repeatPassword !== this.pass) {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    }
  }
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
                <p class="navbar-brand">
                  <img src="\src\components\icons\donut2.png" alt="Logo" class="h-12" width="75" height="75" />
                </p>
                <h2 class="fw-bold mb-2 text-uppercase">Sign up</h2>
                <p class="text-white-50 mb-5">Create your account</p>

                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="email" type="email" id="typeEmailX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="repeatPassword" @input="validatePasswords" type="password" id="typeRepeatPasswordX"
                    class="form-control form-control-lg" />
                  <label class="form-label" for="typeRepeatPasswordX">Repeat Password</label>
                  <p v-if="passwordError" class="text-danger mt-1">Passwords do not match.</p>
                </div>

                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5"
                  type="submit">Sign Up</button>

                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                  <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                  <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                </div>

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

<style></style>