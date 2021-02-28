<template>
  <div class="spiner-container">
    <!-- <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div> -->
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.spiner-container {
  width: 80px;
  height: 50px;
  margin: 20px auto;
  // background-color: red;

  .block {
    position: relative;
    box-sizing: border-box;
    float: left;
    margin: 0 11px 4px 0;
    width: 8px;
    height: 8px;
    border-radius: 3px;
    background: black;

    &:nth-child(4n + 1) {
      animation: wave 1.5s ease 0s infinite;
    }
    &:nth-child(4n + 2) {
      animation: wave 1.5s ease 0.2s infinite;
    }
    &:nth-child(4n + 3) {
      animation: wave 1.5s ease 0.4s infinite;
    }
    &:nth-child(4n + 4) {
      animation: wave 1.5s ease 0.6s infinite;
      margin-right: 0;
    }
  }
}

@keyframes wave {
  0%,
  100% {
    top: 0;
    opacity: 0.8;
  }
  50% {
    top: 30px;
    opacity: 0.1;
  }
}
</style>
