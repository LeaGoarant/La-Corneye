<script setup lang="ts">

const props = defineProps({
  productName: String,
  productPrice: Number,
  contactDialogIsOpen: Boolean,
  messageSend: Boolean
})

const formField = ref([
  {label: "Name", data: '', error: [(value: String | Boolean) => {return !value ? 'This field is required' : true}], isRequired: true, rows: 2, isDisabled: false, type: "text"},
  {label: "Price", data: `${props.productPrice} €`, error: [], isRequired: false, rows: 2, isDisabled: true, type: "text"},
  {label: "Email", data: '', error: [(value: String | Boolean) => {return !value ? 'This field is required' : true}], isRequired: true, rows: 2, isDisabled: false, type: "text"},
  {label: "Message", data: '', error: [(value: String | Boolean) => {return !value ? 'This field is required' : true}], isRequired: true, rows: 4, isDisabled: false, type: "textarea"}
])

const emit = defineEmits(['update:contactDialogIsOpen'])
let messageSent = ref(false)

function handleCloseDialog() {
  emit('update:contactDialogIsOpen', false)
}

function handleSubmitForm() {
  return messageSent.value = true
}
</script>

<template>
  <v-dialog :model-value="contactDialogIsOpen" max-width="500" @click:outside="handleCloseDialog">
    <v-card class="bg-[#E7EAEA] text-[#0C2D32]">
      <template v-if="!messageSent">
        <v-card-title>Contact about "{{ productName }}"</v-card-title>
        <v-card-text>
          <v-form>
            <component
                :is="field.type === 'textarea' ? 'v-textarea' : 'v-text-field'"
                hide-details="auto"
                variant="outlined"
                class="text-field"
                v-for="(field, index) in formField"
                :key="index"
                :disabled="field.isDisabled"
                :label="field.label"
                v-model="field.data"
                :required="field.isRequired"
                :rules="field.error"
                :rows="field.rows"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="outlined" class="text-[#b89e14]" @click="handleCloseDialog">Cancel</v-btn>
          <v-btn variant="outlined" class="text-[#0C2D32]" @click="handleSubmitForm" :disabled="formField.some(field => field.data === '' && field.isRequired === true)">Send</v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-card-text>
          Thank you for your message. It has been sent, we will try to reply shortly.
        </v-card-text>
        <v-card-actions>
          <v-btn plain @click="handleCloseDialog">Close</v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
  .text-field {
    border-radius: 10px;
    background-color: white;
    margin-bottom: 15px;
  }
</style>