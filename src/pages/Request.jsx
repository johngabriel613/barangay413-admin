import React from 'react';
import Table from '../components/Common/Table';
import {useLocation} from 'react-router-dom';


const Request = () => {
  const location = useLocation()
  
  const getTitle = () => {
    switch(location.pathname){
      case '/bcert':
        return 'Barangay Certificate'
      case '/indigency':
        return 'Certificate of Indigency'
      case '/bclearance':
        return 'Business Clearance'
      case '/gmoral':
        return 'Certificate of Good Moral'
      case '/ftjs':
        return 'First Time Job-Seeker'
      default:
        return 'Error 404: Not Found Page'
    }
  }

  const title = getTitle();

  return (
    <div className='w-full p-4'>
      <h2 className='text-2xl font-medium'>{title}</h2>
      <Table/>
    </div>
  )
}


export default Request
