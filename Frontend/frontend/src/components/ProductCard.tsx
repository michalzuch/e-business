import React from 'react'
import { Product } from '../interfaces/productInterface'

const ProductCard: React.FC<Product> = ({ name, description, price, stock }) => {
  return (
    <article>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>${price}</p>
      <p>{stock} left</p>
    </article>
  )
}

export default ProductCard
