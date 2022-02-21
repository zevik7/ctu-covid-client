import React, { useRef } from 'react'

import './index.css'

const clickOutSideRef = (content, toggle) => {
  document.addEventListener('mousedown', (e) => {
    // Click toggle
    if (toggle.current && toggle.current.contains(e.target)) {
      content.current.classList.toggle('active')
    } else {
      // Click outside
      if (content.current && !content.current.contains(e.target))
        content.current.classList.remove('active')
    }
  })
}

const Dropdown = (props) => {
  const dropdown_toggle_el = useRef(null)
  const dropdown_content_el = useRef(null)

  clickOutSideRef(dropdown_content_el, dropdown_toggle_el)

  return (
    <div className="dropdown">
      <button ref={dropdown_toggle_el} className="dropdown__toggle">
        {props.icon && <i className={props.icon}></i>}
        {props.badge && (
          <span className="dropdown-toggle__badge">{props.badge}</span>
        )}
        {props.customToggle && props.customToggle()}
      </button>
      <div ref={dropdown_content_el} className="dropdown__content">
        {props.contentData &&
          props.renderItems &&
          props.contentData.map((item, index) =>
            props.renderItems(item, index)
          )}
        {props.renderFooter && (
          <div className="dropdown__footer">{props.renderFooter()}</div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
