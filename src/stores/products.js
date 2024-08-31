import { defineStore } from 'pinia'

const productsAPI = import.meta.env.VITE_PRODUCT_API

export const useProductsStore = defineStore('products', {
  state: () => ({ products: null }),
  getters: {
    getProducts: (state) => state.products
  },
  actions: {
    async fetchProducts() {
      const productsResponse = await fetch(productsAPI)
      this.products = await productsResponse.json()
    }
  }
})
