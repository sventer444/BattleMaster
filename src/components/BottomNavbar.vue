<!-- BottomNavbar.vue -->

<template>
  <div v-if="showBottomNavbar" class="fixed bottom-0 z-20 flex justify-between items-center p-6 bg-pokemon-red-shaded w-full">
    <!-- Add padding to the left for spacing -->
    <div class="pl-4">
      <!-- Add your bottom navbar content here -->
    </div>
    
    <!-- Computer Icon (Replace with your actual computer icon) -->
    <div class="pr-4">
      <i class="fas fa-desktop text-2xl"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showBottomNavbar: Boolean,
  },
};
</script>

