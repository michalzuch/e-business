import React, { useContext } from 'react'
import BagItem from './BagItem'
import BagContext from '../contexts/BagContext'

const BagView: React.FC = () => {
  const { bag } = useContext(BagContext)
  return (
    <div className='container'>
      {bag.map((product) => (
        <BagItem
          key={product.id}
          id={product.id}
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
