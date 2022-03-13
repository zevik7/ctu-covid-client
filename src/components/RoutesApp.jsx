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
import Profile from '../pages/Setting/Profile'

import NoMatch from './NoMatch'

import AuthProvider from '../context/Auth/Provider'
import ProtectedRoute from '../context/Auth/ProtectedRoute'
import ThemeProvider from '../context/Theme/Provider'

const RoutesApp = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomeLayout />} />

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
            <Route path="profile" element={<Profile />} />
            <Route path="notification" element={<Profile />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default RoutesApp
