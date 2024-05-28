<script>
export default {
  name: "Navbar",
  computed: {
    shouldShowNavbar() {
      const navbarRoutes = ['/', '/menu', '/cart'];
      return navbarRoutes.includes(this.$route.path);
    }
  }
};
</script>

<template>

  <nav v-if="shouldShowNavbar" class="navbar navbar-expand-lg navbar-light bg-light fixed-top" style="height: 70px">

    <div class="container">

      <a class="navbar-brand" href="#"><img src="\src\components\icons\donut2.png" alt="Logo" class="h-12" width="55"
          height="55" />Munchtique</a>


      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <form class="input-group mx-auto " style="width: 400px">
        <input type="search" class="form-control" placeholder="Munch..?" aria-label="Search" />
        <button class="btn btn-outline-primary" type="button" data-mdb-ripple-color="dark"
          style="padding: 0.45rem 1.5rem 0.35rem">
          Search
        </button>
      </form>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="font-size: 18px">

          <li class="nav-item">
            <router-link class="nav-link active d-flex flex-column text-center" aria-current="page" to="/">
              <i class="fas fa-home fa-lg"></i>
              <span class="small">Home</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex flex-column text-center" aria-current="page" to="/menu">
              <i class="fas fa-user-friends fa-lg"></i>
              <span class="small">Menu</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex flex-column text-center" aria-current="page" to="/login">
              <i class="fas fa-briefcase fa-lg"></i>
              <span class="small">Login</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex flex-column text-center" aria-current="page" to="/signup">
              <i class="fas fa-comment-dots fa-lg"></i>
              <span class="small">Signup</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex flex-column text-center" aria-current="page" to="/cart">
              <i class="fas fa-bell fa-lg"></i>
              <span class="small">Cart</span>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"
              role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/src/components/icons/profile.png" class="rounded-circle" height="30" alt="" loading="lazy" />
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">My profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<style>
.navbar-fixed-top {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #1a1a1a;
  padding: 1rem 0;
  z-index: 1000;
}

.navbar-brand {
  font-size: unset;
  height: 3.5rem;
}
</style>
