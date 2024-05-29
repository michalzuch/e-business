import React from 'react'

interface ActionButtonProps {
  name: string
  className?: string
  action: () => void
}

const ActionButton: React.FC<ActionButtonProps> = ({ name, className, action }) => {
  return (
    <button className={className} onClick={action}>
      {name}
    </button>
  )
}

export default ActionButton
