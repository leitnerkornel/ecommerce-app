import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { mount } from '@vue/test-utils'
import ProductItem from '../products/ProductItem.vue'

const testProductItem = {
  id: 1,
  name: 'Oranges',
  img: 'https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/203b374e-e266-4974-9b33-b4091b272d87/Navel%20Oranges%203%20lb',
  availableAmount: 50,
  minOrderAmount: 1,
  price: 19.99
}

describe('ProductItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Component renders properly', () => {
    const wrapper = mount(ProductItem, { props: { product: testProductItem } })
    expect(wrapper.text()).toContain('Oranges')
  })

  it('Quantity amount properly displayed', () => {
    const wrapper = mount(ProductItem, { props: { product: testProductItem } })
    expect(wrapper.text()).toContain('Quantity in stock: 50')
  })

  it('Out of stock error show', () => {
    const product = Object.assign({}, testProductItem, { availableAmount: 0 } )
    const wrapper = mount(ProductItem, { props: { product } })
    expect(wrapper.text()).toContain('Product is out of stock')
  })

  it('Minimum order amount warning show', () => {
    const product = Object.assign({}, testProductItem, { minOrderAmount: 50 } )
    const wrapper = mount(ProductItem, { props: { product } })
    expect(wrapper.text()).toContain('Minimum quantity to buy: 50')
  })

  it('Add to cart button properly displayed', () => {
    const wrapper = mount(ProductItem, { props: { product: testProductItem } })
    expect(wrapper.text()).toContain('Add to Cart')
  })

  it('Product price properly displayed', () => {
    const wrapper = mount(ProductItem, { props: { product: testProductItem } })
    expect(wrapper.text()).toContain('$19.99')
  })
})