<template>
  <div class="container-fluid">
    <div class="position-absolute top-50 start-0 p-5">
      <h1>Cut Your Hair Today</h1>
      <button type="button" class="button mt-4">Get Started</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBody",
};
</script>

<style>
/* CSS */
.button {
  align-items: center;
  background-color: black;
  border: 2px solid black;
  border-radius: 8px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  font-family: Inter, sans-serif;
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
}

.button:after {
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

.button:hover:after {
  transform: translate(0, 0);
}

.button:active {
  background-color: #ffdeda;
  outline: 0;
}

.button:hover {
  outline: 0;
}

@media (min-width: 768px) {
  .button {
    padding: 0 40px;
  }
}
</style>
