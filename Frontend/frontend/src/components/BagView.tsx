import React, { useContext } from 'react'
import BagItem from './BagItem'
import BagContext from '../contexts/BagContext'

const BagView: React.FC = () => {
  const { bag } = useContext(BagContext)
  return (
    <div className='container'>
      {bag.map((product, index) => (
        <BagItem
          key={index}
          id={index}
          name={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
        />
      ))}
    </div>
  )
}

export default BagView
