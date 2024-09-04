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
    <div class="products-container">
      <ProductItem
        v-for="product in productsStore.getProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<style>
.products {
  padding: 2rem;
  min-height: calc(100vh - 10rem);
}

.products-container {
  margin: 0 auto;
  max-width: 1450px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px 50px;
}

@media (max-width: 600px) {
  .products-container {
    gap: 30px;
  }
}
</style>
