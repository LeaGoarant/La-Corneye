<script setup lang="ts">
import crowLogo from '../assets/icons/crow-logo.svg'
import {useAuth} from "~/composables/useAuth";

const router = useRouter()
const { connectedUser, logout } = useAuth()
const keyIcon = computed(() => connectedUser.value ? 'mdi-key-outline' : 'mdi-key')

const handleKeyIconClick = () => {
  if(connectedUser.value) {
    logout()
    router.push('/')
    return
  }
  router.push('/login')
}

const handleAddNexProductClick = () => {
  router.push('/product/add')
}

</script>

<template>
  <header class="flex justify-between items-center">
    <NuxtLink to="/" style="text-decoration:none;">
      <div class="flex ml-5">
        <v-img :src="crowLogo" width="45" height="45" />
        <h1 class="text-xl font-bold text-[#B7C0C2] mt-3 ml-3">La Corn'Eye</h1>
      </div>
    </NuxtLink>
    <div>
      <v-btn v-if="connectedUser !== null"
             @click="handleAddNexProductClick"
             prepend-icon="mdi-plus-circle-outline" elevation="3" variant="text" class="text-[#b89e14] mr-10"
      >
        Add a new product
      </v-btn>
      <v-icon @click="handleKeyIconClick" class="rotate-[90deg] self-center mr-5" color="#b89e14" :icon="keyIcon" size="large" />
    </div>
  </header>
</template>