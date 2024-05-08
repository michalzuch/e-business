import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' // Add this line
import Navbar from './Navbar'

test('renders Navbar component', () => {
  render(
    <BrowserRouter>
      <Navbar bagCount={0} />
    </BrowserRouter>
  )
  expect(screen.getByText('Store')).toBeInTheDocument()
  expect(screen.getByText('Products')).toBeInTheDocument()
  expect(screen.getByText('Bag')).toBeInTheDocument()
  expect(screen.getByText('Payment')).toBeInTheDocument()
  expect(screen.queryByText('0')).toBeNull()
})

test('renders Navbar component with bag count', () => {
  render(
    <BrowserRouter>
      <Navbar bagCount={1} />
    </BrowserRouter>
  )
  expect(screen.getByText('Store')).toBeInTheDocument()
  expect(screen.getByText('Products')).toBeInTheDocument()
  expect(screen.getByText('Bag (1)')).toBeInTheDocument()
  expect(screen.getByText('Payment')).toBeInTheDocument()
  expect(screen.queryByText('0')).toBeNull()
})
