import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({ cartItems: [] }),
  getters: {
    getCartItems: (state) => state.cartItems,
    getTotalAmountCartItems: (state) => {
      let amount = 0
      state.cartItems.forEach((cartItem) => {
        amount += cartItem.quantityInCart
      })
      return amount
    } ,
    amountInCart: (state) => (productId) => {
      const found = state.cartItems.find((item) => item.id === productId)
      return found ? found.quantityInCart : 0
    },
    getCartTotalPrice: (state) => {
      return state.cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantityInCart, 0)
    }
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
    },
    deleteQuantityFromCart(productId, quantityToDelete) {
      const index = this.cartItems.findIndex(({ id }) => id === productId)
      if (index > -1) {
        const itemToReplace = this.cartItems.at(index)
        const modifiedItem = Object.assign({}, itemToReplace, { quantityInCart: itemToReplace.quantityInCart - quantityToDelete })
        this.cartItems.splice(index, 1, modifiedItem)
      }
    },
    deleteFromCart(productId) {
      const index = this.cartItems.findIndex(({ id }) => id === productId)
      if (index > -1) {
        this.cartItems.splice(index, 1)
      }
    }
  }
})
