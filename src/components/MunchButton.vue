<template>
  <div>
    <img :src="imageUrl" alt="Button" @click="handleButtonClick" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: require("src/components/icons/donut.jpg"), // Replace 'button-image.jpg' with your image file name
    };
  },
  methods: {
    handleButtonClick() {
      // Define the action you want to take when the button is clicked
      console.log("Button clicked!");
      // You can add more logic here
    },
  },
};
</script>

<style scoped>
img {
  cursor: pointer;
}
</style>
