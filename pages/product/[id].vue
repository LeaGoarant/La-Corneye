<script setup lang="ts">
import { useRoute } from 'vue-router'
import products from "~/data/products.json";

const route = useRoute()
const isDialogOpen = ref(false)

const productId: number = Number(route.params.id)
const currentProduct = products.find(product => product.id === productId)
const currentImage = ref(0)

</script>

<template>
  <div class="pl-10 pr-10 page-container">
    <h1>{{currentProduct?.title}}</h1>
    <v-row>
      <v-col cols="12" md="1">
        <div class="image-preview" v-for="(image, index) in currentProduct?.images || []">
          <v-img @click="currentImage = index" aspect-ratio="4/3" cover :src="image.path" :width="125" :key="index"/>
        </div>
      </v-col>
      <v-col cols="12" md="5">
        <v-defaults-provider :defaults="{ VBtn: { variant: 'text', color: '#B7C0C2' } }">
          <v-carousel show-arrows="hover" class="image-carousel" cover height="450" v-model="currentImage" >
            <v-carousel-item v-for="(image, index) in currentProduct?.images || []" :key="index" :src="image.path" />
          </v-carousel>
        </v-defaults-provider>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="8" class="bg-[#213D42] text-[#B7C0C2]">
          <v-card-title class="desc-price">{{currentProduct?.price}} €</v-card-title>
          <v-card-text class="desc-text">{{currentProduct?.longDescription}}</v-card-text>
        </v-card>

        <v-btn class="mt-10 bg-[#213D42] text-[#b89e14]" prepend-icon="mdi-email" @click="isDialogOpen = true">
          Contact us to know more about this product
        </v-btn>
      </v-col>
    </v-row>
  </div>

  <ContactDialog
      :contact-dialog-is-open="isDialogOpen"
      @update:contact-dialog-is-open="isDialogOpen = $event"
      :product-name="currentProduct?.title"
      :product-price="currentProduct?.price"
  />
</template>

<style scoped>
  .page-container {
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
  }
  h1 {
    font-size: 3rem;
    color: #B7C0C2;
    font-weight: 700;
    margin-bottom: 25px;
  }
  .image-preview {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .image-carousel {
    width: 80%;
  }
  .desc-price {
    font-size: 1.8rem;
    font-weight: bold;
  }
  .desc-text {
    font-size: 1.2rem;
    margin-top: 10px;
  }
</style>