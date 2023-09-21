import { useState } from 'react';

import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import ContractDialog from './components/ContractDialog';
import LoginForm from './components/LoginForm';
import SectionPage from './components/SectionPage';
//axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/home' element={<SectionPage />} />
        <Route element={<Layout />}>
          <Route path='/' element={<Table />} />
          <Route path='/contract' element={<ContractDialog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
