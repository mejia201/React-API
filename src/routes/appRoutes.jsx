import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Login } from '../views/auth/Login';
import { Register } from '../views/auth/Register';
import { Dashboard } from '../views/home/Dashboard'; 
import { Bootcamps } from '../views/home/Bootcamps';
import { Navbar } from '../components/Navbar';

export const AppRoutes = () => {
  const location = useLocation();


  const showNavbar = location.pathname !== '/' && location.pathname !== '/register';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bootcamps" element={<Bootcamps />} />
      </Routes>
    </>
  );
};


