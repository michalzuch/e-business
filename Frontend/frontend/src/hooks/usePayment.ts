import { useState } from 'react'
import api from '../api/api'

const usePayment = () => {
  const [paymentStatus, setPaymentStatus] = useState('')

  const handlePayment = (formData: { card_number: string; name: string; expiration_date: string; cvv: string }) => {
    api
      .post('/payments', formData)
      .then((response) => {
        setPaymentStatus('Payment successful: ' + response.data['success'])
      })
      .catch((error) => {
        setPaymentStatus('Payment failed: ' + error)
      })
  }

  return { paymentStatus, handlePayment }
}

export default usePayment
