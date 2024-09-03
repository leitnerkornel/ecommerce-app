<script setup>
import { useCartStore } from '@/stores/cart.js'
import CartItem from '@/components/cart/CartItem.vue'
import { computed } from 'vue'

const cartStore = useCartStore()

const roundedTotalPrice = computed(() => Math.round(cartStore.getCartTotalPrice * 100) / 100)
</script>

<template>
  <div class="cart">
    <h1>Cart</h1>
    <div v-if="cartStore.getCartItems.length" class="text-right font-weight-bold mb-4">Total: ${{ roundedTotalPrice }}</div>
    <div v-else class="cart-empty">Your cart is empty</div>
    <div class="cart-container">
      <CartItem v-for="cartItem in cartStore.getCartItems" :key="cartItem.id" :cartItem="cartItem"/>
    </div>
    <div v-if="cartStore.getCartItems.length" class="checkout-btn-container">
      <v-btn size="large" color="yellow">Checkout</v-btn>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.cart-empty {
  margin-top: 150px;
  text-align: center;
}

.checkout-btn-container {
  margin-top: 60px;
  display: flex;
  justify-content: end;
}
</style>
