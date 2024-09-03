import { defineStore } from 'pinia'
import { useCartStore } from './cart.js'
import { addUniqueIds } from '@/utils/utils.js'

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

const cartStore = useCartStore()

export const useProductsStore = defineStore('products', {
  state: () => ({ products: null }),
  getters: {
    getProducts: (state) => state.products,
    getProductById: (state) => (productId) => state.products.find((item) => item.id === productId),
    isAddToCartDisabled: (state) => (productId) => {
      const product = state.getProductById(productId)
      return product.availableAmount < 1
    },
    isQuantityDecreaseDisabled: (state) => ({ id: productId, quantityInCart }) => {
      const product = state.getProductById(productId)
      return product.minOrderAmount > 1 && quantityInCart === product.minOrderAmount

    }
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
    increaseStock(productId, quantity) {
      const index = this.products.findIndex(item => item.id === productId)
      if (index > -1) {
        const productToReplace = this.products.at(index)
        const modifiedProduct = Object.assign({}, productToReplace, { availableAmount: productToReplace.availableAmount + quantity })
        this.products.splice(index, 1, modifiedProduct)
      }
    },
    deleteNumberedFromCart(productId, quantity) {
      this.increaseStock(productId, quantity)
      cartStore.deleteQuantityFromCart(productId, quantity)
    },
    deleteProductFromCart(productId, quantityInCart) {
      this.increaseStock(productId, quantityInCart)
      cartStore.deleteFromCart(productId)
    }
  }
})
