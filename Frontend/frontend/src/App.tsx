import React from 'react'
import BagView from './components/BagView'
import Navbar from './components/Navbar'
import Payment from './components/Payment'
import Products from './components/Products'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import useBag from './hooks/useBag'

const App: React.FC = () => {
  const { bag, addToBag, resetBag } = useBag()

  return (
    <Router>
      <Navbar bagCount={bag.length} />
      <Routes>
        <Route path='/products' element={<Products addToBag={addToBag} />} />
        <Route path='/bag' element={<BagView products={bag} />} />
        <Route path='/payment' element={<Payment resetBag={resetBag} />} />
        <Route path='/' element={<Navigate to='/products' />} />
      </Routes>
    </Router>
  )
}

export default App
