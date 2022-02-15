import React from 'react'

import './index.css'

const TopNav = () => {
  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Nhập nội dung tìm kiếm" />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav-right__item"></div>
        <div className="topnav-right__item"></div>
        <div className="topnav-right__item"></div>
      </div>
    </div>
  )
}

export default TopNav
