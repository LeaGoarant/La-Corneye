<script setup lang="ts">
import "assets/css/main.css";
import Header from "../components/Header.vue";

</script>

<template>
  <v-app>
    <div class="flex flex-col min-h-screen bg-[#0c2d32]">
      <Header />
      <main class="flex-grow">
        <slot />
      </main>
    </div>
  </v-app>
</template>

<style scoped>
</style>