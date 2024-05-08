import { Product } from '../interfaces/Product'
import api from './api'

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`/products`)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default fetchProducts
