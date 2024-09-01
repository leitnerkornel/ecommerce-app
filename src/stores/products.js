import { defineStore } from 'pinia'

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const useProductsStore = defineStore('products', {
  state: () => ({ products: null }),
  getters: {
    getProducts: (state) => state.products
  },
  actions: {
    async fetchProducts() {
      const productsResponse = await fetch(`${BASE_API_URL}/products`)
      this.products = await productsResponse.json()
    }
  }
})
