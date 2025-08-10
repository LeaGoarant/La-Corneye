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

<template>
  <v-card
      class="bg-[#213D42]"
      elevation="15"
  >
    <v-row>
      <v-col cols="12">
        <v-img height="300px" :src="defaultImage.path" />
      </v-col>
    </v-row>
    <div class="text-[#B7C0C2]">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ price }} €
      </v-card-text>
    </div>
  </v-card>
</template>