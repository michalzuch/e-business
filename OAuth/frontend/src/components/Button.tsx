import React from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  name: string
  to: string
}

const Button: React.FC<ButtonProps> = ({ name, to }) => {
  return (
    <Link to={to}>
      <button>{name}</button>
    </Link>
  )
}

export default Button
