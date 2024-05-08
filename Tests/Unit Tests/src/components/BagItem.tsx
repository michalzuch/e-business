import React from 'react'
import { Product } from '../interfaces/Product'

const BagItem: React.FC<Product> = ({ id, name, price }) => {
  return (
    <article key={id}>
      <div>
        <h3>{name}</h3>
        <p>${price}</p>
      </div>
    </article>
  )
}

export default BagItem
