import React from 'react'
import { Product } from '../interfaces/Product'
import ProductCard from './ProductCard'
import useProducts from '../hooks/useProducts'

interface ProductsProps {
  addToBag: (product: Product) => void
}

const Products: React.FC<ProductsProps> = ({ addToBag }) => {
  const { products, loading, error } = useProducts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='container'>
      <ul>
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            stock={product.stock}
            addToBag={() => addToBag(product)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Products
