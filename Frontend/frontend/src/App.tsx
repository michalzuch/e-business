import Navbar from './components/Navbar'
import Payment from './components/Payment'
import Products from './components/Products'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [showProducts, setShowProducts] = useState(true)
  const [showPayment, setShowPayment] = useState(false)

  const handleProductsClick = () => {
    setShowProducts(true)
    setShowPayment(false)
  }

  const handlePaymentClick = () => {
    setShowProducts(false)
    setShowPayment(true)
  }

  return (
    <div className='App'>
      <Navbar handleProductsClick={handleProductsClick} handlePaymentClick={handlePaymentClick} />
      {showProducts && <Products />}
      {showPayment && <Payment />}
    </div>
  )
}

export default App
