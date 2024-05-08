import App from './App'
import { render, screen } from '@testing-library/react'

test('renders the App component', () => {
  render(<App />)
})

test('renders the Navbar component', () => {
  render(<App />)
  expect(screen.getByText('Store')).toBeInTheDocument()
  expect(screen.getByText('Products')).toBeInTheDocument()
  expect(screen.getByText('Bag')).toBeInTheDocument()
  expect(screen.getByText('Payment')).toBeInTheDocument()

  expect(screen.getByText('Products')).toHaveAttribute('href', '/products')
  expect(screen.getByText('Bag')).toHaveAttribute('href', '/bag')
  expect(screen.getByText('Payment')).toHaveAttribute('href', '/payment')
})
