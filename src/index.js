import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss';
import RoomProvider from './context/RoomContext';
import Home from './pages/Home';
import Room from './pages/Room';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/room/:id/:isUser' element={<Room />} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
);
