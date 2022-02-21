import React from 'react'

import './index.css'

import Dropdown from '../Dropdown'

import ThemeMenu from '../ThemeMenu'

import notifications from '../../assets/JsonData/notification.json'

import user_image from '../../assets/images/tuat.png'

import user_menus from '../../assets/JsonData/user_menus.json'

import { Link } from 'react-router-dom'

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
)

const curr_user = {
  display_name: 'Tuat Tran',
  image: user_image,
}

const renderUserToggle = (user) => (
  <div className="topnav-right__user">
    <div className="topnav-right-user__image">
      <img src={user.image} alt="" />
    </div>
    <div className="topnav-right-user__name">{user.display_name}</div>
  </div>
)

const renderUserMenu = (item, index) => (
  <Link to="/" key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
)

const TopNav = () => {
  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Nhập nội dung tìm kiếm" />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav-right__item">
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menus}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav-right__item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View all</Link>}
          />
        </div>
        <div className="topnav-right__item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  )
}

export default TopNav
