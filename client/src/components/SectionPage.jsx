import { InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SectionPage = () => {
  const [table, setTable] = useState('');

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
      <div className='bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-screen  bg-cover bg-center'>
        <div className='w-full h-full flex  justify-center items-center backdrop-brightness-50'>
          <div className='  h-[100px] max-w-[800px] max-h-[100px] flex gap-x-2'>
            <Link
              to={'/table'}
              className='bg-blue-600  w-60 hover:outline-b-8 hover:border-b-4 text-white  text-xl font-bold items-center flex justify-center cursor-pointer hover:underline '>
              Consolidated
            </Link>
            <Link
              to={'table/PNI'}
              className='bg-purple-600 w-60 hover:outline-b-8 hover:border-b-4 text-white  text-xl font-bold items-center flex justify-center cursor-pointer hover:underline '>
              PNI
            </Link>
            <Link
              to={'table/PTA'}
              className='bg-teal-600 w-60 hover:outline-b-8 hover:border-b-4 text-white  text-xl font-bold items-center flex justify-center cursor-pointer hover:underline '>
              PTA
            </Link>
            <Link
              to={'table/PBO'}
              className='bg-orange-600 w-60 hover:outline-b-8 hover:border-b-4 text-white  text-xl font-bold items-center flex justify-center cursor-pointer hover:underline '>
              PBO
            </Link>
            <Link
              to={'table/PBA'}
              className='bg-lime-600 w-60 hover:outline-b-8 hover:border-b-4 text-white  text-xl font-bold items-center flex justify-center cursor-pointer hover:underline '>
              PBA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
