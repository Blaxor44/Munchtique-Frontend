<script>
import Navbar from '@/components/Navbar.vue';
import SideContent from '@/components/SideContent.vue';
import MunchButton from '@/components/MunchButton.vue';

export default {
  name: 'App',
  components: {
    Navbar, SideContent, MunchButton
  },
};
</script>

<template>
  <Navbar />
  <div id="nav" class="nav-links">
  </div>
  <div class="container main-content">
    <router-view></router-view>
  </div>
</template>

<style>
.nav-links {
  display: none;
  /* Assuming these links are part of the Navbar and not needed separately */
}

.main-content {
  margin-top: 60px;
  /* Adjust based on the height of your navbar */
}
</style>
