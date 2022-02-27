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
import Login from '../pages/Login'

import NoMatch from './NoMatch'

import AuthProvider from './Auth/Provider'
import ProtectedRoute from './Auth/ProtectedRoute'

const RoutesApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route index path="/" element={<HomeLayout />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="location" element={<Location />} />
          <Route path="declaration" element={<DeclarationHistory />} />
          <Route path="injection" element={<Injection />} />
          <Route path="vaccine-type" element={<VaccineType />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  )
}

export default RoutesApp
