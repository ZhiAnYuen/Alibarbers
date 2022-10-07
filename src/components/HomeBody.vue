<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 align-self-center">
        <h1 class="text-center">Cut Your Hair Today</h1>
        <button
          id="get-started-button"
          type="button"
          class="button mt-4 mb-4 mx-auto d-block"
        >
          Get Started
        </button>
      </div>
      <div class="col-md-6 align-self-center text-center">
        <img class="img-fluid" src="../assets/main-image.PNG" alt="..." />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBody",
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 60px;
}

#get-started-button {
  align-items: center;
  background-color: black;
  border: 2px solid black;
  border-radius: 8px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:after {
    background-color: white;
    border: 2px solid black;
    border-radius: 8px;
    content: "";
    display: block;
    height: 48px;
    left: 0;
    width: 100%;
    position: absolute;
    top: -2px;
    transform: translate(8px, 8px);
    transition: transform 0.2s ease-out;
    z-index: -1;
  }

  &:hover {
    &:after {
      transform: translate(0, 0);
    }
    outline: 0;
  }

  &:active {
    color: black;
    background-color: $yellow;
    outline: 0;
  }
}

@media (min-width: 768px) {
  #get-started-button {
    padding: 0 40px;
  }
}
</style>
