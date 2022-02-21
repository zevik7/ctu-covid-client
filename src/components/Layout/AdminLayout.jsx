import React, { useEffect } from 'react'

import './index.css'

import Sidebar from '../Sidebar'
import TopNav from '../TopNav'

import { Outlet } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

const Layout = () => {
  const theme = useSelector((state) => state.themeReducer)

  return (
    <div className={`adminLayout ${theme.mode} ${theme.color}`}>
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
