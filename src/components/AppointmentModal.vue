<template>
  <Transition name="modal">
    <div class="modal-wrapper row" v-if="showModal">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"> </slot>
        </div>
      </div>
      <div class="modal-mask" @click="$emit('close')"></div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "AppointmentModal",
  props: {
    showModal: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  padding: 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  position: fixed;
  left: 25%;
  width: 50%;
  z-index: 9999;
  min-width: 500px;
 
}

.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}
/*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
