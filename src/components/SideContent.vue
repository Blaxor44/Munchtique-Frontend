<template>
  <div class="side-content">
    <div class="text-content">
      <p class="text">
        From Order to <br />
        Doorstep in Minutes
      </p>
    </div>
    <img src="\icons\fast-food.png" height="500" width="600" class="side-image" />
  </div>
</template>

<script>
export default {
  name: "SideContent",
};
</script>

<style>
.side-content {
  align-items: center;
  /* Adjust the margin-left and margin-top as needed */
  margin-left: 0px;
  /* Adjust left position */
  margin-top: 10px;
  /* Adjust top position */
  padding: 20px;
}

.side-image {
  margin-right: 20px;
}

.text-content {
  max-width: 600px;
  text-align: center;
}

.text {
  font-size: 50px;
  /* Adjust the font size as needed */
  font-family: cursive;
  /* Change the font family as needed */
  color: whitesmoke;
  /* Change the text color as needed */
}
</style>
