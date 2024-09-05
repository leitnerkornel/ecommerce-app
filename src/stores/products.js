import { defineStore } from 'pinia'
import { useCartStore } from './cart.js'
import { addUniqueIds } from '@/utils/utils.js'

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

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
      try {
        const productsResponse = await fetch(`${BASE_API_URL}/products`)
        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products for ${BASE_API_URL}`)
        }

        const productsData = await productsResponse.json()
        this.products = addUniqueIds(productsData)
      } catch (error) {
        console.error(error)
      }
    },
    addProductToCart(product, quantity) {
      const cartStore = useCartStore()
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
      const cartStore = useCartStore()
      cartStore.deleteQuantityFromCart(productId, quantity)
    },
    deleteProductFromCart(productId, quantityInCart) {
      this.increaseStock(productId, quantityInCart)
      const cartStore = useCartStore()
      cartStore.deleteFromCart(productId)
    }
  }
})
