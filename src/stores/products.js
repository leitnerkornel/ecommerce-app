import { defineStore } from 'pinia'
import { useCartStore } from './cart.js'
import { addUniqueIds } from '@/utils/utils.js'

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

const cartStore = useCartStore()

export const useProductsStore = defineStore('products', {
  state: () => ({ products: null }),
  getters: {
    getProducts: (state) => state.products
  },
  actions: {
    async fetchProducts() {
      const productsResponse = await fetch(`${BASE_API_URL}/products`)
      const productsData = await productsResponse.json()
      this.products = addUniqueIds(productsData)
    },
    addProductToCart(product, quantity) {
      cartStore.addToCart(product, quantity)
      this.decreaseStock(product.id, quantity)
    },
    decreaseStock(productId, quantity) {
      const index = this.products.findIndex(item => item.id === productId)
      if (index > -1) {
        const productToReplace = this.products.at(index)
        const modifiedProduct = Object.assign({}, productToReplace, { availableAmount: productToReplace.availableAmount - quantity })
        this.products.splice(index, 1, modifiedProduct)
      }
    },
    increaseStock(product, quantity) {

    }
  }
})
