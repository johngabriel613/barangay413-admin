import React from 'react'
import { useAuth } from '../src/hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedLayout = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.accessToken ? <Outlet/> : <Navigate to="/auth" replace state={{from: location.pathname}}/>
}

export default ProtectedLayout
