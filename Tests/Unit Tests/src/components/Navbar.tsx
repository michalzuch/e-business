import React from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  bagCount: number
}

const Navbar: React.FC<NavbarProps> = ({ bagCount }) => {
  return (
    <nav>
      <ul>
        <li>
          <strong>Store</strong>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/products'>Products</Link>
        </li>
        <li>
          <Link to='/bag'>Bag{bagCount > 0 ? ` (${bagCount})` : ''}</Link>
        </li>
        <li>
          <Link to='/payment'>Payment</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
