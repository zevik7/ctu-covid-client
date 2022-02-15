import React from 'react'

import './index.css'

import Sidebar from '../Sidebar'
import TopNav from '../TopNav'

import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="adminLayout">
      <Sidebar />
      <div className="adminLayout__body">
        <TopNav />
        <div className="adminLayout__content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
