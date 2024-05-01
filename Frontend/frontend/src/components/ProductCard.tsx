import React from 'react'
import { Product } from '../interfaces/Product'

interface ProductCardProps extends Product {
  addToBag: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, stock, addToBag }) => {
  const product: Product = { id, name, description, price, stock }
  return (
    <article>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>${price}</p>
      <p>{stock} left</p>
      <button onClick={() => addToBag(product)}>Buy</button>
    </article>
  )
}

export default ProductCard
