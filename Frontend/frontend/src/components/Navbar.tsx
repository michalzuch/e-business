import React from 'react'

interface NavbarProps {
  handleProductsClick: () => void
  handlePaymentClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ handleProductsClick, handlePaymentClick }) => {
  return (
    <nav>
      <ul>
        <li>
          <strong>Store</strong>
        </li>
      </ul>
      <ul>
        <li>
          <a onClick={handleProductsClick}>Products</a>
        </li>
        <li>
          <a onClick={handlePaymentClick}>Payment</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
