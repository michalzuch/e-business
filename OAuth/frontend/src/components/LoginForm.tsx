import React, { useState } from 'react'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json().then((data) => ({ status: response.status, body: data })))
      .then((result) => {
        if (result.status === 200) {
          setMessage('')
          sessionStorage.setItem('token', result.body.token)
          window.location.replace('/')
        } else {
          setMessage(result.body.message)
        }
      })
      .catch((error) => {
        console.error('Sign In failed:', error)
      })
  }

  return (
    <div>
      <h3>Welcome back</h3>
      <input type='text' placeholder='Email' value={email} onChange={handleEmailChange} />
      <br />
      <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
      <br />
      <button onClick={handleLogin}>Sign In</button>
      {message !== '' && <p>{message}</p>}
    </div>
  )
}

export default LoginForm
