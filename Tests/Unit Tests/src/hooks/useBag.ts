import { useState } from 'react'
import { Product } from '../interfaces/Product'

const useBag = () => {
  const [bag, setBag] = useState<Product[]>([])

  const addToBag = (product: Product) => {
    setBag((prevBag) => [...prevBag, product])
  }
  const resetBag = () => {
    setBag([])
  }

  return { bag, addToBag, resetBag }
}

export default useBag
