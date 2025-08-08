<template>
  <v-card color="#0c2d32">
    <v-row>
      <v-col cols="12">
        <v-img height="300px" :src="defaultImage.path" />
      </v-col>
    </v-row>
    <div>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ price }} €
      </v-card-text>
      <v-card-actions>
        <v-btn
            append-icon="mdi-chevron-right"
            color="#B7C0C2"
            variant="outlined"
            block
        />
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup lang="ts">

import type {Images} from "~/types/products";

const props = defineProps<{
  title: string;
  description: string;
  price: number;
  images: Images[];
}>()

const defaultImage = computed(() => {
  return props.images.find(img => img.isDefault) ?? props.images[0] ?? { path: '/default-image.jpg', isDefault: true }
})
</script>