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
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-background {
  min-height: 100vh;
  background: linear-gradient(90deg, #ff1252, #0f0e0e);
  position: relative;
  width: 100%;
  overflow-x: hidden;
  /* Prevent horizontal scroll */
}

.main-content {
  margin-top: 60px;
  /* Adjust based on the height of your navbar */
  min-height: calc(100vh - 60px);
  /* Adjust this if you have a fixed navbar */
  /* padding-bottom: 60px; Add padding if there's a footer */
}

.nav-links {
  display: none;
  /* Assuming these links are part of the Navbar and not needed separately */
}
</style>
