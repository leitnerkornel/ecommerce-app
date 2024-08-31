<script setup>
import { useProductsStore } from '@/stores/products.js'

const productsStore = useProductsStore()

if (!productsStore.getProducts) {
  productsStore.fetchProducts()
}
</script>

<template>
  <div class="products">
    <h1>Products</h1>
    <li v-for="item in productsStore.getProducts" :key="item.key">{{ item.name }}</li>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .products {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
