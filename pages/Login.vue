<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";

const { login } = useAuth()
const router = useRouter()

const user = ref({
  name: '',
  password: '',
})
const error = ref('')

const handleSubmit = () => {
  console.warn('HEYA')
  if (!login(user.value.name, user.value.password)) {
    error.value = 'No user found'
  } else {
    router.push('/')
  }
}

</script>

<template>
  <div class="flex justify-center items-center h-screen overflow-hidden">
    <v-card class="w-1/2 bg-[#E7EAEA] text-[#0C2D32]">
      <v-card-text>
        <v-form>
          <v-text-field
              v-model="user.name"
              label="Username"
              required
              variant="outlined"
          />
          <v-text-field
              v-model="user.password"
              label="Password"
              required
              type="password"
              variant="outlined"
          />
          <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
        </v-form>
      </v-card-text>
      <v-card-actions class="flex justify-end">
        <v-btn @click="handleSubmit" variant="outlined" class="text-[#0C2D32]">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
</style>