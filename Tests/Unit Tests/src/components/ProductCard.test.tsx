import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'

test('renders ProductCard component', () => {
  render(
    <ProductCard
      key={0}
      id={0}
      name={'Name'}
      description={'Description'}
      price={10.99}
      stock={10}
      addToBag={() => {}}
    />
  )
  expect(screen.queryByText('0')).toBeNull()
  expect(screen.getByText('Name')).toBeInTheDocument()
  expect(screen.getByText('Description')).toBeInTheDocument()
  expect(screen.getByText('$10.99')).toBeInTheDocument()
  expect(screen.getByText('10 left')).toBeInTheDocument()
  expect(screen.getByText('Buy')).toBeInTheDocument()
})
