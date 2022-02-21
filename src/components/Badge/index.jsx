import React from 'react'

import './index.css'

const badgeStyle = {
  danger: 'badge-danger',
  primary: 'badge-primary',
  danger: 'badge-danger',
}

const Badge = (props) => {
  return (
    <div>
      <span className={`badge badge-${props.type}`}>{props.content}</span>
    </div>
  )
}

export default Badge
