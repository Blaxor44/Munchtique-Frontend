<script>
import Navbar from '@/components/Navbar.vue';
import SideContent from '@/components/SideContent.vue';
import MunchButton from '@/components/MunchButton.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    SideContent,
    MunchButton
  },
};
</script>


<template>
  <div class="app-background">
    <Navbar />
    <div id="nav" class="nav-links"></div>
    <div class="container main-content">
      <router-view></router-view>
    </div>
  </div>
</template>


<style>
.app-background {
  min-height: 100vh;
  background: linear-gradient(90deg, #ff1252, #0f0e0e);
}

.nav-links {
  display: none;
  /* Assuming these links are part of the Navbar and not needed separately */
}

.main-content {
  margin-top: 60px;
  /* Adjust based on the height of your navbar */
}
</style>
