import { expect, describe, afterEach, beforeEach, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useProductsStore } from '@/stores/products.js'
import { addUniqueIds } from '@/utils/utils.js'

describe('Products store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Store renders properly', async () => {
    const product = useProductsStore()
    expect(product.products).toBeNull()
  })

  it('Product ids will be unique after correction', () => {
    const ids = [{ id: 2 }, { id: 4 }, { id: 6 }, { id: 4 }]
    const correctedIds = addUniqueIds(ids)
    expect(correctedIds).toEqual([{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }])
  })

  it('Getter getProductById returns the correct product', () => {
    const productsStore = useProductsStore()
    productsStore.products = [
      { id: 1, name: 'Blueberries' },
      { id: 2, name: 'Oranges' }
    ]

    const product = productsStore.getProductById(1)
    expect(product).toEqual({ id: 1, name: 'Blueberries' })
  })

  it('Action decreaseStock correctly updates availableAmount', () => {
    const productsStore = useProductsStore()
    productsStore.products = [{ id: 1, name: 'Red apples', availableAmount: 10 }]

    productsStore.decreaseStock(1, 2)
    expect(productsStore.products[0].availableAmount).toBe(8)
  })

  it('Action increaseStock correctly updates availableAmount', () => {
    const productsStore = useProductsStore()
    productsStore.products = [{ id: 1, name: 'Bananas', availableAmount: 8 }]

    productsStore.increaseStock(1, 2)

    expect(productsStore.products[0].availableAmount).toBe(10)
  })
})
