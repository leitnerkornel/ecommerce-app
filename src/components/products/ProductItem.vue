<script setup>
import { computed, ref } from 'vue'
import { useProductsStore } from '@/stores/products.js'
import { useCartStore } from '@/stores/cart.js'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const isImageLoadingFailed = ref(false)

const productImage = computed(() => {
  return isImageLoadingFailed.value ? 'image-load-failed.png' : props.product.img
})

const buttonText = computed(() => {
  if (isOutOfStock.value) {
    return 'Out of Stock'
  } else if (!isMinimumAmountAvailable.value) {
    return 'Not Available'
  }
  return 'Add to Cart'
})

const errorMessage = computed(() => {
  if (isOutOfStock.value) {
    return 'Product is out of stock.'
  } else if (!isMinimumAmountAvailable.value) {
    return 'Minimum amount is not available.'
  }
  return ''
})

const isMinimumAmount = computed(() => props.product.minOrderAmount > 1)
const isOutOfStock = computed(() => props.product.availableAmount === 0)
const quantityToAdd = computed(() => cartStore.amountInCart(props.product.id) === 0 ? props.product.minOrderAmount : 1)
const isMinimumAmountAvailable = computed(() => props.product.availableAmount - quantityToAdd.value >= 0)
const isAddToCartDisabled = computed(() => !isMinimumAmountAvailable.value || isOutOfStock.value)

const addToCart = () => {
  productsStore.addProductToCart(props.product, quantityToAdd.value)
}

const onImgError = () => {
  isImageLoadingFailed.value = true
}
</script>

<template>
  <v-card
    height="360"
    width="250"
    min-width="250"
    elevation="2"
    class="d-flex flex-column align-content-space-evenly mx-auto"
  >
    <v-img
      :src="productImage"
      @error="onImgError"
      :alt="props.product.name"
      width="250"
      min-height="167"
      max-height="166"
    />
    <v-card-title class="text-capitalize">{{ props.product.name }}</v-card-title>
    <v-card-text class="pb-2">Quantity in stock: {{ props.product.availableAmount }}</v-card-text>
    <div class="product-item-minimum-amount-container">
      <v-card-text
        v-if="isMinimumAmount"
        class="py-0 text-orange-accent-2"
      >Minimum quantity to buy:
        {{ props.product.minOrderAmount }}
      </v-card-text>
    </div>
    <div class="product-item-error-container mt-2">
      <v-card-text
        v-if="errorMessage"
        class="py-0 text-red-accent-3"
      >
        {{ errorMessage }}
      </v-card-text>
    </div>
    <v-card-actions class="py-0">
      <v-card-text class="font-weight-bold text-h6 px-2 mt-1">${{ props.product.price }}</v-card-text>
      <v-btn
        :disabled="isAddToCartDisabled"
        variant="tonal"
        color="blue"
        @click="addToCart"
      >
        {{ buttonText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.product-item-minimum-amount-container {
  height: 25px;
}

.product-item-error-container {
  height: 30px;
}
</style>
