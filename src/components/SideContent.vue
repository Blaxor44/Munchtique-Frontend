<template>
  <div class="side-content">
    <img src="\src\components\icons\fast-food.png" height="500" width="600" class="side-image" />
    <div class="text-content">
      <p class="text">
        From Order to <br />
        Doorstep in Minutes
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideContent",
};
</script>

<style>
.side-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}

.side-image {
  margin-right: 20px;
}

.text-content {
  max-width: 600px;
}

.text {
  font-size: 50px;
  /* Adjust the font size as needed */
  font-family: cursive;
  /* Change the font family as needed */
  color: #333;
  /* Change the text color as needed */
}
</style>
