<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'

const router = useRouter()
const cartStore = useCartStore()

const goToCart = () => {
  router.push('/cart')
}

</script>

<template>
  <header>
    <div class="header-content-wrapper">
      <div class="router-links">
        <RouterLink
          to="/products"
          class="ma-auto router-btn"
        >
          Products
        </RouterLink>
        <RouterLink
          to="/cart"
          class="ma-auto router-btn"
        >
          Cart
        </RouterLink>
      </div>
      <v-spacer></v-spacer>
      <div class="cart-badge-container">
        <v-badge
          :content="cartStore.getTotalAmountCartItems"
          class="ma-auto"
          color="yellow"
          @click="goToCart"
        >
          <v-icon
            color="#00005F"
            icon="mdi-cart"
            size="x-large"
          ></v-icon>
        </v-badge>
      </div>
    </div>
  </header>
  <RouterView />
  <footer><p class="ma-auto font-weight-medium">Copyright © 2024 e-commerce</p></footer>
</template>

<style scoped>
header {
  top: 0;
  background-color: white;
  z-index: 1;
  position: sticky;
  height: 5rem;
  line-height: 1.5;
}

.router-links {
  height: 5rem;
  display: flex;
  margin-left: 2rem;
}

.router-btn {
  width: 6rem;
}

.cart-badge-container {
  display: flex;
  width: 7rem;
}

.header-content-wrapper {
  display: flex;
  flex-direction: row;
}

footer {
  height: 5rem;
  background-color: white;
  display: flex;
}
</style>
