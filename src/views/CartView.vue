<script setup>
import { useCartStore } from '@/stores/cart.js'
import CartItem from '@/components/cart/CartItem.vue'
import { computed } from 'vue'

const cartStore = useCartStore()

const roundedTotalPrice = computed(() => Math.round(cartStore.getCartTotalPrice * 100) / 100)
const totalAmountAndTotalPrice = computed(() => `${cartStore.getTotalAmountCartItems} item(s) in your cart for a total of $${roundedTotalPrice.value}`)
</script>

<template>
  <div class="cart">
    <div
      v-if="cartStore.getCartItems.length"
      class="text-right font-weight-bold mb-4 text-black"
    >
      Total: ${{ roundedTotalPrice }}
    </div>
    <div
      v-else
      class="cart-empty font-weight-bold text-black"
    >
      Your cart is empty
    </div>
    <div class="cart-container">
      <CartItem
        v-for="cartItem in cartStore.getCartItems"
        :key="cartItem.id"
        :cart-item="cartItem"
      />
    </div>
    <div
      v-if="cartStore.getCartItems.length"
      class="checkout-btn-container flex-sm-row"
    >
      <div class="ml-0 mb-5 my-sm-auto text-black">{{ totalAmountAndTotalPrice }}</div>
      <v-btn
        class="disable-double-tap-zoom"
        size="large"
        color="yellow"
      >
        Checkout
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.cart {
  max-width: 1450px;
  padding: 2rem;
  min-height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.cart-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.cart-empty {
  margin: auto;
  text-align: center;
}

.checkout-btn-container {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
