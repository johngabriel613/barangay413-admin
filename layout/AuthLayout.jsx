import React from 'react'
import { useAuth } from '../src/hooks/useAuth'
import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
  const {auth} = useAuth();
  return (
    auth?.accessToken ? <Navigate to="/"/> : <Outlet/>
  )
}

export default AuthLayout
