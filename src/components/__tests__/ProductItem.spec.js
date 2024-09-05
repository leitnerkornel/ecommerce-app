import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { mount } from '@vue/test-utils'
import ProductItem from '../products/ProductItem.vue'

const testProductItem = {
  id: 1,
  name: 'Oranges',
  img: 'oranges.png',
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
    const product = Object.assign({}, testProductItem, { availableAmount: 0 })
    const wrapper = mount(ProductItem, { props: { product } })
    expect(wrapper.text()).toContain('Product is out of stock')
  })

  it('Minimum order amount warning show', () => {
    const product = Object.assign({}, testProductItem, { minOrderAmount: 50 })
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

  it('Computed productImage is correct', async () => {
    const wrapper = mount(ProductItem, { props: { product: testProductItem } })
    expect(wrapper.vm.productImage).toBe('oranges.png')
  })

  it('Computed isOutOfStock is correct', () => {
    const product = Object.assign({}, testProductItem, { availableAmount: 0 })
    const wrapper = mount(ProductItem, { props: { product } })

    expect(wrapper.vm.isOutOfStock).toBe(true)
  })

  it('Computed buttonText is correct - Add to Cart', () => {
    const wrapper = mount(ProductItem, { props: { product: testProductItem } })

    expect(wrapper.vm.buttonText).toBe('Add to Cart')
  })

  it('Computed buttonText is correct - Out of Stock', () => {
    const product = Object.assign({}, testProductItem, { availableAmount: 0 })
    const wrapper = mount(ProductItem, { props: { product } })

    expect(wrapper.vm.buttonText).toBe('Out of Stock')
  })

  it('Computed buttonText is correct - Not Available', () => {
    const product = Object.assign({}, testProductItem, { minOrderAmount: 70 })
    const wrapper = mount(ProductItem, { props: { product } })

    expect(wrapper.vm.buttonText).toBe('Not Available')
  })

  it('Computed errorMessage is correct - Product is out of stock', () => {
    const product = Object.assign({}, testProductItem, { availableAmount: 0 })
    const wrapper = mount(ProductItem, { props: { product } })

    expect(wrapper.vm.errorMessage).toBe('Product is out of stock.')
  })

  it('Computed errorMessage is correct - Minimum amount is not available', () => {
    const product = Object.assign({}, testProductItem, { minOrderAmount: 70 })
    const wrapper = mount(ProductItem, { props: { product } })

    expect(wrapper.vm.errorMessage).toBe('Minimum amount is not available.')
  })

  it('Computed quantityToAdd is correct', () => {
    const product = Object.assign({}, testProductItem, { minOrderAmount: 70 })

    const wrapperQuantityOne = mount(ProductItem, { props: { product: testProductItem } })
    const wrapperQuantityMore = mount(ProductItem, { props: { product } })

    expect(wrapperQuantityOne.vm.quantityToAdd).toBe(1)
    expect(wrapperQuantityMore.vm.quantityToAdd).toBe(70)
  })

  it('Computed isAddToCartDisabled is correct', () => {
    const product = Object.assign({}, testProductItem, { availableAmount: 0 })

    const wrapperMinOrderNotAvailable = mount(ProductItem, { props: { product } })
    const wrapperOutOfStock = mount(ProductItem, { props: { product } })
    const wrapperEnabled = mount(ProductItem, { props: { product: testProductItem } })

    expect(wrapperMinOrderNotAvailable.vm.isAddToCartDisabled).toBe(true)
    expect(wrapperOutOfStock.vm.isAddToCartDisabled).toBe(true)
    expect(wrapperEnabled.vm.isAddToCartDisabled).toBe(false)
  })
})