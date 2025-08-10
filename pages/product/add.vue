<script setup lang="ts">
import type {Images, Products} from "~/types/products";
import {fileToBase64} from "~/composables/fileStandardizer";

const requiredField = [(value: String | Boolean) => {return !value ? 'This field is required' : true}]
const newProduct = ref<Products>({
  title: "",
  description: "",
  longDescription: "",
  price: 0,
  images: []
})
const imageInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<File[]>([]);

const disableSaveButton = computed(() => {
  return (
      !newProduct.value.title.trim() ||
      !newProduct.value.longDescription.trim() ||
      !newProduct.value.price
  )
})

const handleRemoveImg = (index: number) => {
  newProduct.value.images.splice(index, 1)
}

const addImages = () => {
  imageInput.value?.click()
}

const selectImages = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!file) continue

    selectedFiles.value.push(file);
    const imageObj: Images = {
      path: URL.createObjectURL(file),
      isDefault: newProduct.value.images.length === 0
    }
    newProduct.value.images.push(imageObj)
  }
}

const handleSaveNewProduct = async () => {
  const imagesBase64 = await Promise.all(
      selectedFiles.value.map(async (file) => ({
        filename: file.name,
        base64: await fileToBase64(file)
      }))
  )

  const productPayload = {
    title: newProduct.value.title,
    description: newProduct.value.description,
    longDescription: newProduct.value.longDescription,
    price: newProduct.value.price,
    images: imagesBase64
  }


  await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productPayload)
  })
}

</script>

<template>
  <div class="pl-10 pr-10 page-container">
    <form>
      <v-text-field
          hide-details="auto"
          variant="outlined"
          label="Product title"
          required
          :rules="requiredField"
          v-model="newProduct.title"
      />
      <v-row>
        <v-col cols="12" md="6">
          <v-sheet
              @click="addImages"
              class="images-layout flex flex-col justify-between"
              rounded="lg"
              elevation="3"
              height="46vh"
          >
            <div class="text-[#364F53] flex justify-center items-center h-full">
              <v-icon icon="mdi-plus-circle-outline"/>
              Add images
            </div>
            <div class="flex mb-2 ml-2">
              <div class="relative mr-2" v-for="(image, index) in newProduct?.images || []" :key="index">
                <v-btn @click="(e: Event) => { e.stopPropagation(); handleRemoveImg(index) }"
                       class="absolute -top-1 -left-1 z-10"
                       density="compact"
                       icon="mdi-close"
                       size="small"
                />
                <v-img
                    class="rounded-md"
                    aspect-ratio="4/3"
                    cover
                    :src="image.path"
                    width="70"
                    height="70"
                />
              </div>
            </div>
            <input
                type="file"
                multiple
                accept="image/*"
                ref="imageInput"
                @change="selectImages"
                style="display:none"
            />
          </v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <v-text-field
                hide-details="auto"
                variant="outlined"
                label="Product price"
                required
                :rules="requiredField"
                v-model="newProduct.price"
                append-inner-icon="mdi-currency-eur"
            />
            <v-text-field
                hide-details="auto"
                variant="outlined"
                label="Short description"
                v-model="newProduct.description"
            />
            <v-textarea
                hide-details="auto"
                variant="outlined"
                label="Long description"
                required
                :rules="requiredField"
                v-model="newProduct.longDescription"
            />
          </div>
        </v-col>
      </v-row>
    </form>
    <v-btn @click="handleSaveNewProduct"
           class="mt-10 bg-[#213D42] text-[#b89e14] flex justify-end"
           :disabled="disableSaveButton"
    >
      Save
    </v-btn>
  </div>
</template>

<style scoped>
.page-container {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
.images-layout {
  background: #B7C0C2;
  cursor: pointer;
}
.v-input {
  background-color: #B7C0C2;
  color: #364F53;
  border-radius:  12px;
  margin-bottom: 20px;
}
</style>