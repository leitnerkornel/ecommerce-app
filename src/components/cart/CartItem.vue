<script setup>
import { computed, ref } from 'vue'
import { useProductsStore } from '@/stores/products.js'
import { DELETE_TYPES } from '@/enums.js'

const productStore = useProductsStore()

const props = defineProps({
  cartItem: {
    type: Object,
    required: true
  }
})

const isImageLoadingFailed = ref(false)

const productImage = computed(() => {
  return isImageLoadingFailed.value ? 'image-load-failed.png' : props.cartItem.img
})

const amountAndPrice = computed(() => `$${props.cartItem.price} x ${props.cartItem.quantityInCart}`)
const totalPrice = computed(() => Math.round(props.cartItem.price * props.cartItem.quantityInCart * 100) / 100)

const addNumberedProductToCart = () => {
  productStore.isAddToCartDisabled(props.cartItem.id)
  productStore.addProductToCart(props.cartItem, 1)
}

const deleteFromCart = (deleteType) => {
  const { id: productId, quantityInCart } = props.cartItem

  if (deleteType === DELETE_TYPES.ALL || quantityInCart === 1) {
    productStore.deleteProductFromCart(productId, quantityInCart)
  } else {
    productStore.deleteNumberedFromCart(productId, 1)
  }
}

const onImgError = () => {
  isImageLoadingFailed.value = true
}
</script>

<template>
  <v-list-item
    :key="props.cartItem.id"
    variant="elevated"
    class="pa-0 rounded cart-list-item"
  >
    <template v-slot:prepend>
      <v-img height="70" width="105" :src="productImage" @error="onImgError" class="mr-2 cart-item-img" />
    </template>
    <v-list-item-title class="font-weight-bold text-capitalize">{{ props.cartItem.name }}</v-list-item-title>
    <v-list-item-subtitle>{{ amountAndPrice }}</v-list-item-subtitle>
    <template v-slot:append>
      <div class="mr-5 font-weight-bold disable-select">${{ totalPrice }}</div>
      <div class="buttons">
        <v-btn
          color="red-lighten-1"
          icon="mdi-minus"
          variant="text"
          :disabled="productStore.isQuantityDecreaseDisabled(props.cartItem)"
          @click="() => deleteFromCart(DELETE_TYPES.ONE)"
        ></v-btn>
        <div class="ma-auto font-weight-bold disable-select">{{ props.cartItem.quantityInCart }}</div>
        <v-btn
          color="blue"
          icon="mdi-plus"
          variant="text"
          :disabled="productStore.isAddToCartDisabled(props.cartItem.id)"
          @click="addNumberedProductToCart"
        ></v-btn>
      </div>
      <v-btn
        color="red-lighten-1"
        icon="mdi-delete"
        variant="text"
        @click="() => deleteFromCart(DELETE_TYPES.ALL)"
      ></v-btn>
    </template>
  </v-list-item>
</template>

<style scoped>
.cart-list-item {
  height: 70px;
}

@media (max-width: 600px) {
  .cart-list-item {
    height: 115px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .cart-item-img {
    display: none;
  }

  .cart-list-item :deep(.v-list-item__content) {
    justify-content: flex-start;
    width: 100%;
    margin-left: 2rem;
  }
  .cart-list-item :deep(.v-list-item__append) {
    width: 100%;
    justify-content: flex-end;
  }
}

.buttons {
  display: flex;
  flex-direction: row;
  width: 130px;
  border-radius: 4px;
  box-shadow: gray 1px 1px 2px 0;
}

.disable-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>