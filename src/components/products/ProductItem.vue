<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const isMinimumAmount = computed(() => props.product.minOrderAmount > 1)
</script>

<template>
  <v-card height="400" width="250">
    <v-img :src="props.product.img" width="250" height="166"/>
    <v-card-title class="text-capitalize">{{ props.product.name }}</v-card-title>
    <v-card-text>Quantity in stock: {{ props.product.availableAmount }}</v-card-text>
    <v-card-text v-if="isMinimumAmount" class="py-0 text-red-accent-3">Minimum quantity to buy: {{ props.product.minOrderAmount }}</v-card-text>
    <v-card-text class="font-weight-bold text-h6" :class="{ 'mt-5': !isMinimumAmount }">${{ props.product.price }}</v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn variant="tonal" color="blue">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>