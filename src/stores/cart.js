import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({ cartItems: [] }),
  getters: {
    getCartItems: (state) => state.cartItems,
    amountInCart: (state) => (productId) => {
      const found = state.cartItems.find((item) => item.id === productId)
      return found ? found.quantityInCart : 0
    }
    //getCartTotalPrice: (state) => state.cartItems
  },
  actions: {
    addToCart(product, quantityToAdd) {
      const index = this.cartItems.findIndex(item => item.id === product.id)
      if (index > -1) {
        const itemToReplace = this.cartItems.at(index)
        const modifiedItem = Object.assign({}, itemToReplace, { quantityInCart: itemToReplace.quantityInCart + quantityToAdd })
        this.cartItems.splice(index, 1, modifiedItem)
      } else {
        this.cartItems.push(Object.assign({}, product, { quantityInCart: quantityToAdd }))
      }
    }
  }
})
