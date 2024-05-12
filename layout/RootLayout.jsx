import React from 'react';
import { Sidebar } from '../src/components/Common/Sidebar';
import {Outlet} from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default RootLayout
