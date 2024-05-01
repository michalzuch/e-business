import React, { useContext } from 'react'
import { Product } from '../interfaces/Product'
import ProductCard from './ProductCard'
import useProducts from '../hooks/useProducts'
import BagContext from '../contexts/BagContext'

const Products: React.FC = () => {
  const { addToBag } = useContext(BagContext)
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
