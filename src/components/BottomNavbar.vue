<template>
  <div v-if="showBottomNavbar" class="fixed bottom-0 z-20 flex justify-between items-center p-6 bg-pokemon-red-shaded w-full">
    <!-- Add padding to the left for spacing -->
    <div class="pl-4"></div>

    <!-- Centered PC Icon -->
    <div class="flex-grow flex justify-center">
      <div class="cursor-pointer" @click="goToPCWindow">
        <i class="fas fa-desktop text-2xl"></i>
      </div>
    </div>

    <!-- Pokedex Icon at the Far Right -->
    <div class="pr-4 cursor-pointer" @click="goToPokedex">
      <i class="fas fa-book text-2xl"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showBottomNavbar: Boolean,
  },
  methods: {
    goToPCWindow() {
      // Use this.$router.push to navigate to the PC window
      this.$router.push('/pc-window');
    },
    goToPokedex() {
      // Use this.$router.push to navigate to the Pokedex window
      this.$router.push('/pokedex');
    },
  },
};
</script>
