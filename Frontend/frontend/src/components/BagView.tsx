import React from 'react'
import { Bag } from '../interfaces/Bag'
import BagItem from './BagItem'

const BagView: React.FC<Bag> = ({ products }) => {
  return (
    <div className='container'>
      {products.map((product, index) => (
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
