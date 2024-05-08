import { Product } from '../interfaces/Product'
import BagContext from './BagContext'
import { render } from '@testing-library/react'

test('BagContext', () => {
  const bag: Product[] = []
  const addToBag = () => {}
  const resetBag = () => {}

  const { getByText } = render(
    <BagContext.Provider value={{ bag, addToBag, resetBag }}>
      <div>Bag Context</div>
    </BagContext.Provider>
  )

  expect(getByText('Bag Context')).toBeInTheDocument()
  expect(BagContext).toBeDefined()
  expect(BagContext.Provider).toBeDefined()
  expect(BagContext.Consumer).toBeDefined()
})
