import React, { useContext, useState } from 'react'
import usePayment from '../hooks/usePayment'
import BagContext from '../contexts/BagContext'

const Payment: React.FC = () => {
  const { resetBag } = useContext(BagContext)
  const [formData, setFormData] = useState({
    card_number: '',
    name: '',
    expiration_date: '',
    cvv: '',
  })
  const { paymentStatus, handlePayment } = usePayment()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handlePayment(formData)
    resetBag()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Card number <input name='card_number' placeholder='1234 1234 1234 1234' onChange={handleInputChange} />
          </label>
          <label>
            Name <input name='name' placeholder='Your Name' onChange={handleInputChange} />
          </label>
          <label>
            Expiration date <input name='expiration_date' placeholder='01/01' onChange={handleInputChange} />
          </label>
          <label>
            CVV <input name='cvv' placeholder='123' type='password' onChange={handleInputChange} />
          </label>
        </fieldset>

        <input type='submit' value='Pay' />
      </form>
      {paymentStatus.includes('true') && <div>{paymentStatus}</div>}
    </div>
  )
}

export default Payment
