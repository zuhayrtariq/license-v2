import { InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/login', {
        username,
        password,
      });
      alert(data);
    } catch (e) {
      alert('Invalid ');
      console.log('Error : ', e.message);
    }
  };
  return (
    <div className=' flex flex-col h-screen justify-center items-center   '>
      <div className="bg-[url('loginpagebg.jpg')] w-full h-screen  bg-cover bg-center">
        <div className='w-full h-full flex  justify-center items-center backdrop-brightness-50'>
          <form
            className='flex flex-col gap-2 font-bold  z-10 bg-gray-100 rounded-xl p-8 '
            onSubmit={(e) => handleFormSubmit(e)}>
            <TextField
              id='username'
              label='Username'
              type='text'
              required={true}
              autoFocus
              variant='outlined'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              id='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              required={true}
              variant='outlined'
              autoComplete='new-password'
              value={password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {showPassword ? (
                      <FaEye onClick={() => setShowPassword(false)} />
                    ) : (
                      <FaEyeSlash onClick={() => setShowPassword(true)} />
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {username.length && password.length ? (
              <button
                type='submit'
                className='bg-blue-500 text-white hover:bg-white hover:text-blue-500 duration-500 hover:outline-blue-500 hover:outline hover:outline-3 py-2 rounded-md text-sm font-bold'>
                Login
              </button>
            ) : (
              <button
                type='submit'
                disabled
                className='  bg-gray-500 text-white  duration-500  py-2 rounded-md text-sm font-bold'>
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
