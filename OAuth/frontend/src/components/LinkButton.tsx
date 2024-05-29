import React from 'react'
import { Link } from 'react-router-dom'

interface LinkButtonProps {
  name: string
  to: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ name, to }) => {
  return (
    <Link to={to}>
      <button>{name}</button>
    </Link>
  )
}

export default LinkButton
