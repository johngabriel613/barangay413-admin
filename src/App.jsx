import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation} from 'react-router-dom';
import Auth from './pages/Auth';
import ProtectedLayout from '../layout/ProtectedLayout';
import { action as authAction } from './components/Auth/Login';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home';
import AuthLayout from '../layout/AuthLayout';
import RootLayout from '../layout/RootLayout';
import Request from './pages/Request';
import { Certificate } from './components/Template/Certificate';

const App = () => {
  const {setAuth} = useAuth()

  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      
      <Route element={<AuthLayout/>}>
        <Route path='/auth' element={<Auth/>} action={authAction(setAuth)}/>
      </Route>

      <Route element={<Certificate/>} path='/testpdf'/>
      <Route element={<ProtectedLayout/>}>
        <Route element={<RootLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/:request' element={<Request/>}/>
        </Route>
      </Route>
    </Route>
  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App

