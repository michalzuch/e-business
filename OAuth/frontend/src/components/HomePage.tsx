import React from 'react'
import Button from './Button'

const HomePage: React.FC = () => {
  return (
    <>
      {!sessionStorage.getItem('token') && <Button name='Login' to={'/login'} />}
      {sessionStorage.getItem('token') && (
        <div>
          <p>Hi! You are logged in</p>
          <button
            onClick={() => {
              sessionStorage.removeItem('token')
              window.location.reload()
            }}
          >
            Log out
          </button>
        </div>
      )}
    </>
  )
}

export default HomePage
