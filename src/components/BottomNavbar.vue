<template>
    <div v-if="showBottomNavbar" class="sticky bottom-0 z-10 flex justify-around p-6 bg-pokemon-red-shaded">
      <div>
        <!-- Computer Icon (Replace with your actual computer icon) -->
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
  