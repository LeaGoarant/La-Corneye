<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-img height="300px" src="/crow-logo.png" />
      <div>
        <v-card-title>
          Product title
        </v-card-title>
        <v-card-text>
          Product description
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
</script>