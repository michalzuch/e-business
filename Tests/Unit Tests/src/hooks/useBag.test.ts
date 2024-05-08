import useBag from './useBag'
import { renderHook, act } from '@testing-library/react'

test('useBag', () => {
  const { result } = renderHook(() => useBag())

  expect(result.current.bag).toEqual([])
  expect(result.current.addToBag).toBeDefined()
  expect(result.current.resetBag).toBeDefined()

  act(() => {
    result.current.addToBag({
      id: 0,
      name: 'Name',
      description: 'Description',
      price: 10.99,
      stock: 10,
    })
  })

  expect(result.current.bag).toEqual([
    {
      id: 0,
      name: 'Name',
      description: 'Description',
      price: 10.99,
      stock: 10,
    },
  ])

  act(() => {
    result.current.resetBag()
  })

  expect(result.current.bag).toEqual([])
})
