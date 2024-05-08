import { Bag } from './Bag'

test('Bag', () => {
  const bag: Bag = {
    products: [],
  }

  expect(bag.products).toEqual([])
})
