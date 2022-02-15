import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomeLayout from './Layout/HomeLayout.jsx'
import AdminLayout from './Layout/AdminLayout.jsx'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
      </Route>
    </Routes>
  )
}

export default RoutesApp
