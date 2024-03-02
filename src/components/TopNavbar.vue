<template>
  <div v-if="showTopNavbar" class="fixed top-0 z-20 flex justify-between items-center p-6 bg-pokemon-red-shaded w-full">
    <RegionsMenu @show-user-info="showUserInfo" />
    <div>
      <!-- Player Icon (Replace with your actual player icon) -->
      <i class="fas fa-user-circle text-2xl cursor-pointer" @click="showUserInfo"></i>
    </div>
  </div>
</template>

<script>
import RegionsMenu from './RegionsMenu';

export default {
  components: {
    RegionsMenu,
  },
  props: {
    showTopNavbar: Boolean,
  },
  methods: {
    showUserInfo() {
      this.$emit('show-user-info');
    },
  },
};
</script>
