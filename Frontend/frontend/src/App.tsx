import React from 'react'
import BagView from './components/BagView'
import Navbar from './components/Navbar'
import Payment from './components/Payment'
import Products from './components/Products'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import useBag from './hooks/useBag'
import BagContext from './contexts/BagContext'

const App: React.FC = () => {
  const { bag, addToBag, resetBag } = useBag()

  const contextValue = React.useMemo(() => ({ bag, addToBag, resetBag }), [bag, addToBag, resetBag])

  return (
    <BagContext.Provider value={contextValue}>
      <Router>
        <Navbar bagCount={bag.length} />
        <Routes>
          <Route path='/products' element={<Products />} />
          <Route path='/bag' element={<BagView />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/' element={<Navigate to='/products' />} />
        </Routes>
      </Router>
    </BagContext.Provider>
  )
}

export default App
