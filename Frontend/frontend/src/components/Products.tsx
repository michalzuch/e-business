import React, { useState, useEffect } from 'react'
import { Product } from '../interfaces/productInterface'
import fetchProducts from '../api/productsApi'
import ProductCard from './ProductCard'

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts()
      setProducts(data)
    }

    fetchData()
  }, [])

  return (
    <div className='container'>
      <ul>
        {products.map((product: Product) => (
          <ProductCard
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </ul>
    </div>
  )
}

export default Products
