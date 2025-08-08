<template>
  <div>
    <ProductCard
        v-for="product in products || []"
        :key="product.id"
        :title="product.title"
        :description="product.description"
        :price="product.price"
        :images="product.images"
    />
  </div>
</template>

<script setup lang="ts">
import "~~/assets/css/main.css";
import ProductCard from "~/components/base/ProductCard.vue";
import products from "~~/assets/data/products.json";

</script>