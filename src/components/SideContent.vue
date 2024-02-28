<template>
  <div class="side-content">
    <div class="text-content">
      <p class="text">
        From Order to <br />
        Doorstep in Minutes
      </p>
    </div>
    <img src="\src\components\icons\fast-food.png" height="500" width="600" />
  </div>
</template>

<script>
export default {
  name: "SideContent",
};
</script>

<style>
.side-content {
  position: absolute;
  top: 50%;
  left: 150px; /* Adjust as needed */
  transform: translateY(-50%);
}

.text {
  left: 10;
  align-items: center;
  font-size: 50px; /* Adjust the font size as needed */
  font-family: cursive; /* Change the font family as needed */
  color: #333; /* Change the text color as needed */
}
</style>
