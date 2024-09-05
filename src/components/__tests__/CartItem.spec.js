import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { mount } from '@vue/test-utils'
import CartItem from '../cart/CartItem.vue'

const testCartItem = {
  id: 5,
  name: 'Blueberries',
  img: 'blueberries.png',
  availableAmount: 30,
  minOrderAmount: 10,
  price: 2.99,
  quantityInCart: 2
}

describe('CartItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Component renders properly', () => {
    const wrapper = mount(CartItem, { props: { cartItem: testCartItem } })
    expect(wrapper.text()).toContain('Blueberries')
  })

  it('Price and quantity amount properly displayed', () => {
    const wrapper = mount(CartItem, { props: { cartItem: testCartItem } })
    expect(wrapper.text()).toContain(`$${testCartItem.price} x ${testCartItem.quantityInCart}`)
  })

  it('Computed amountAndPrice is correct', () => {
    const wrapper = mount(CartItem, { props: { cartItem: testCartItem } })

    expect(wrapper.vm.amountAndPrice).toBe('$2.99 x 2')
  })

  it('Computed totalPrice is correct', () => {
    const wrapper = mount(CartItem, { props: { cartItem: testCartItem } })

    expect(wrapper.vm.totalPrice).toBe(5.98)
  })
})