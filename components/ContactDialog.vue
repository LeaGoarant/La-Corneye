<script setup lang="ts">

const props = defineProps({
  productName: String,
  productPrice: Number,
  contactDialogIsOpen: Boolean,
  messageSend: Boolean
})

const formField = ref([
  {label: "Name", data: '', error: [(value: String | Boolean) => {return !value ? 'This field is required' : true}], isRequired: true, rows: 2, isDisabled: false},
  {label: "Price", data: `${props.productPrice} €`, error: [], isRequired: false, rows: 2, isDisabled: true},
  {label: "Email", data: '', error: [(value: String | Boolean) => {return !value ? 'This field is required' : true}], isRequired: true, rows: 2, isDisabled: false},
  {label: "Message", data: '', error: [(value: String | Boolean) => {return !value ? 'This field is required' : true}], isRequired: true, rows: 4, isDisabled: false}
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
    <v-card>
      <template v-if="!messageSent">
        <v-card-title>Contact about "{{ productName }}"</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
                v-for="(field, index) in formField"
                :key="index"
                :disabled="field.isDisabled"
                :label="field.label"
                v-model="field.data"
                :required="field.isRequired"
                :rows="field.rows"
                :rules="field.error"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="handleCloseDialog">Cancel</v-btn>
          <v-btn color="primary" @click="handleSubmitForm" :disabled="formField.some(field => field.data === '' && field.isRequired === true)">Send</v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-card-text>
          Your message has been sent, we will try to reply shortly.
        </v-card-text>
        <v-btn text @click="handleCloseDialog">Close</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>