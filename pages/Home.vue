<script setup lang="ts">
import products from "~/data/products.json";
import ProductCard from "../components/ProductCard.vue";
</script>

<template>
  <v-row class="pl-10 pr-10">
    <v-col cols="12" md="4"
           v-for="product in products || []"
           :key="product.id">
      <NuxtLink :to="`/product/${product.id}`" style="text-decoration:none;">
        <ProductCard
            :title="product.title"
            :description="product.description"
            :price="product.price"
            :images="product.images"
        />
      </NuxtLink>
    </v-col>
  </v-row>
</template>
