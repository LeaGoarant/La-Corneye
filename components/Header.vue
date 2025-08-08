<script setup lang="ts">
import crowLogo from '../assets/icons/crow-logo.svg'

</script>

<template>
  <header>
    <NuxtLink :to="`/`" style="text-decoration:none;">
      <div class="flex">
        <v-img class="logo" :src="crowLogo" />
        <h1 class="text-xl font-bold text-[#B7C0C2] mt-3 ml-3">La Corn'Eye</h1>
      </div>
    </NuxtLink>
  </header>
</template>

<style scoped>
  .logo {
    max-width: 45px;
    margin-top: 5px;
    margin-left: 10px;
  }
</style>