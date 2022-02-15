import React from 'react'

import './index.css'

import Logo from '../../assets/images/logo.png'

import SidebarItemList from '../../assets/JsonData/sidebar_routes.json'

import { Link, useLocation } from 'react-router-dom'

const SidebarItem = (props) => {
  const active = props.active ? 'active' : ''

  return (
    <div className="sidebar__item">
      <div className={`sidebar-item__inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  )
}

const Sidebar = () => {
  const location = useLocation()

  const activeItem = SidebarItemList.findIndex((item) => {
    return item.route === location.pathname
  })
  console.log(location.pathname)

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={Logo} alt="Admin panel logo" />
      </div>
      {SidebarItemList.map((item, index) => (
        <Link to={item.route} key={index}>
          {
            <SidebarItem
              title={item.display_name}
              icon={item.icon}
              active={index === activeItem}
            />
          }
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
