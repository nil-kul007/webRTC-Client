import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss';
import RoomProvider from './context/RoomContext';
import Home from './pages/Home';
import Room from './pages/Room';
import CustomerSupport from './pages/CustomerSupport';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/support' element={<CustomerSupport />} />
          <Route path='/room/:id/:isUser' element={<Room />} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
);
