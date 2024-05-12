import React from 'react';
import {Form} from 'react-router-dom';
import { bgpilipinasSeal, brgySeal, manilaSeal } from '../../constants/images';
import { axios } from '../../config/api';

const Login = () => {
  return (
    <Form method='post' className='w-full max-w-[400px] grid gap-4 p-8 border border-gray-300 rounded-md rounded-sm shadow-sm'>
      <div className='flex justify-center gap-2'>
        <img src={brgySeal} alt="" width={50}/>
        <img src={manilaSeal} alt="" width={50}/>
        <img src={bgpilipinasSeal} alt="" width={50}/>
      </div>
      <h2 className='font-medium border-l-4 border-primary p-2'>Barangay 413 Admin Portal</h2>
      <fieldset className='grid gap-2'>
        <div className='grid gap-1'>
          <label htmlFor="username" className='text-sm'>Username</label>
          <input id='username' type="text" name='username' className='bg-gray-100 p-2 rounded-sm'/>
        </div>
        <div className='grid gap-1'>
          <label htmlFor="password" className='text-sm'>Password</label>
          <input id='password' type="password" name='password' className='bg-gray-100 p-2 rounded-sm'/>
        </div>
      </fieldset>
      <button className='w-full bg-primary text-white font-medium py-2 rounded-sm'>Login</button>
    </Form>
  )
}

export default Login

export const action = setAuth => async({request}) => {
  try {
    const formData = await request.formData();

    // Convert FormData to JSON object
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const response = await axios.post('/auth', data)

    await setAuth({accessToken: response.data.accessToken})

    localStorage.setItem('accessToken', response.data.accessToken)

    return {ok: true}
  } catch (error) {
    throw error
  }
}
