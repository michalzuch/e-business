import React, { useState } from 'react'
import api from '../api/api'

const Payment = () => {
  const [formData, setFormData] = useState({
    card_number: '',
    name: '',
    expiration_date: '',
    cvv: '',
  })
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handlePayment(formData)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Card number
            <input name='card_number' placeholder='1234 1234 1234 1234' onChange={handleInputChange} />
          </label>
          <label>
            Name
            <input name='name' placeholder='Your Name' onChange={handleInputChange} />
          </label>
          <label>
            Expiration date
            <input name='expiration_date' placeholder='01/01' onChange={handleInputChange} />
          </label>
          <label>
            CVV
            <input name='cvv' placeholder='123' type='password' onChange={handleInputChange} />
          </label>
        </fieldset>

        <input type='submit' value='Pay' />
      </form>
      {paymentStatus && <div>{paymentStatus}</div>}
    </div>
  )
}

export default Payment
