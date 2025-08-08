<script setup lang="ts">
import { useRoute } from 'vue-router'
import products from "~~/assets/data/products.json";

const route = useRoute()
const productId: number = Number(route.params.id)
const currentProduct = products.find(product => product.id === productId)

</script>

<template>
  <div>
    <h1>{{currentProduct?.title}}</h1>
    <v-row>
      <v-col cols="12" md="1">
        <div v-for="(image, index) in currentProduct?.images || []">
          <v-img aspect-ratio="4/3" cover :src="image.path" :width="125" :key="index"/>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-carousel cover>
          <v-carousel-item v-for="(image, index) in currentProduct?.images || []" :key="index" :src="image.path" />
        </v-carousel>
      </v-col>
      <v-col cols="12" md="5">
        <div>
          <h2>{{currentProduct?.price}} €</h2>
          <v-card :text="currentProduct?.description" elevation="8">
            <v-btn prepend-icon="mdi-email">Contact us to know more about this product</v-btn>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>