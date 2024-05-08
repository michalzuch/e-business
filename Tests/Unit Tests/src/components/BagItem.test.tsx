import { render, screen } from '@testing-library/react'
import BagItem from './BagItem'

test('renders BagItem component', () => {
  const product = {
    key: 0,
    id: 0,
    name: 'Name',
    price: 10.99,
    description: 'Description',
    stock: 10,
  }
  render(<BagItem {...product} />)
  expect(screen.getByText('Name')).toBeInTheDocument()
  expect(screen.getByText('$10.99')).toBeInTheDocument()
  expect(screen.queryByText('10 left')).toBeNull()
  expect(screen.queryByText('Buy')).toBeNull()
  expect(screen.queryByText('Description')).toBeNull()
  expect(screen.queryByText('0')).toBeNull()
  expect(screen.queryByText('id')).toBeNull()
})
