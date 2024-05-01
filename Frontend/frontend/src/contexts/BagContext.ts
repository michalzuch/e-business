import { createContext } from 'react'
import { Product } from '../interfaces/Product'

interface BagContextType {
  bag: Product[]
  addToBag: (product: Product) => void
  resetBag: () => void
}

const BagContext = createContext<BagContextType>({
  bag: [],
  addToBag: () => {},
  resetBag: () => {},
})

export default BagContext
