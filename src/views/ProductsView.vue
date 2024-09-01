<script setup>
import { useProductsStore } from '@/stores/products.js'
import ProductItem from '@/components/products/ProductItem.vue'

const productsStore = useProductsStore()

if (!productsStore.getProducts) {
  productsStore.fetchProducts()
}
</script>

<template>
  <div class="products">
    <h1>Products</h1>
    <div class="products-container">
      <ProductItem v-for="product in productsStore.getProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<style>
.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: flex-start;
}
</style>
