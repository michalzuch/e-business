import { useEffect, useState } from 'react'
import fetchProducts from '../api/productsApi'
import { Product } from '../interfaces/Product'

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchProducts()
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { products, loading, error }
}

export default useProducts
