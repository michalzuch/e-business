import usePayment from './usePayment'
import { renderHook, act } from '@testing-library/react'

test('usePayment', () => {
  const { result } = renderHook(() => usePayment())

  expect(result.current.paymentStatus).toBe('')
  expect(result.current.handlePayment).toBeDefined()
  expect(result.current.handlePayment).toBeInstanceOf(Function)

  act(() => {
    result.current.handlePayment({
      card_number: '1234 1234 1234 1234',
      name: 'Name',
      expiration_date: '01/01',
      cvv: '123',
    })
  })
  expect(result.current.paymentStatus).toBe('')
})
