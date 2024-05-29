import React from 'react'
import LinkButton from './LinkButton'
import Cookies from 'js-cookie'
import ActionButton from './ActionButton'

const HomePage: React.FC = () => {
  return (
    <>
      {!Cookies.get('token') && (
        <div className='buttons'>
          <LinkButton name='Login' to={'/login'} />
          <LinkButton name='Register' to={'/register'} />
          <ActionButton
            name='Google'
            className='google-button'
            action={() => (window.location.href = 'http://localhost:3000/api/google')}
          />
        </div>
      )}
      {Cookies.get('token') && (
        <div>
          <p>Hi! You are logged in</p>
          <button
            onClick={() => {
              Cookies.remove('token')
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
