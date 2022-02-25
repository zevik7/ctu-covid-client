import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomeLayout from './Layout/HomeLayout.jsx'
import AdminLayout from './Layout/AdminLayout.jsx'

import Dashboard from '../pages/Dashboard'
import User from '../pages/User'
import Location from '../pages/Location'
import DeclarationHistory from '../pages/DeclarationHistory'
import Injection from '../pages/Injection'
import VaccineType from '../pages/VaccineType'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="location" element={<Location />} />
        <Route path="delaration-history" element={<DeclarationHistory />} />
        <Route path="injection" element={<Injection />} />
        <Route path="vaccine-type" element={<VaccineType />} />
      </Route>
    </Routes>
  )
}

export default RoutesApp
