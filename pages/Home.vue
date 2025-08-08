<script setup lang="ts">
import products from "~~/assets/data/products.json";
import ProductCard from "../components/ProductCard.vue";
</script>

<template>
  <v-row>
    <v-col cols="12" md="4"
           v-for="product in products || []"
           :key="product.id">
      <ProductCard
          :title="product.title"
          :description="product.description"
          :price="product.price"
          :images="product.images"
      />
    </v-col>
  </v-row>
</template>

<style scoped>

</style>