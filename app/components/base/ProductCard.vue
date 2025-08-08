<template>
  <v-card color="#0c2d32">
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-img height="300px" :src="defaultImage.path" />
      <div>
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ description }}
          {{ price }}
        </v-card-text>
        <v-card-actions>
          <v-btn
              append-icon="mdi-chevron-right"
              color="#e2a287"
              text="Contact button"
              variant="outlined"
              block
          />
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { Images } from "~~/types/products";

const props = defineProps<{
  key: number;
  title: string;
  description: string;
  price: number;
  images: Images[];
}>()

const defaultImage = computed(() => {
  return props.images.find(img => img.isDefault) ?? props.images[0] ?? { path: '/default-image.jpg', isDefault: true }
})
</script>