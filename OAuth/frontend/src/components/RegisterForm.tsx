import React, { useState } from 'react'
import Button from './LinkButton'

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleRegistration = () => {
    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json().then((data) => ({ status: response.status, body: data })))
      .then((result) => {
        if (result.status === 200) {
          setMessage('Account created')
        } else {
          setMessage(result.body.message)
        }
      })
      .catch((error) => {
        console.error('Sign Up failed:', error)
      })
  }

  return (
    <div>
      {message === '' ? (
        <>
          <h3>Create Account</h3>
          <input type='text' placeholder='Username' value={username} onChange={handleUsernameChange} />
          <br />
          <input type='text' placeholder='Email' value={email} onChange={handleEmailChange} />
          <br />
          <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
          <br />
          <button onClick={handleRegistration}>Sign Up</button>
        </>
      ) : (
        <>
          <p>{message}</p>
          <Button name='< Back' to='/' />
        </>
      )}
    </div>
  )
}

export default RegisterForm
