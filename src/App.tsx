import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage }  from './pages';

const  App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
