import useProducts from './useProducts'
import { renderHook } from '@testing-library/react'

test('useProducts', () => {
  const { result } = renderHook(() => useProducts())

  expect(result.current.products).toEqual([])
  expect(result.current.loading).toBeDefined()
  expect(result.current.error).toBeDefined()
})
