import React from 'react';
import Home from './pages/Home'
import Register from './pages/Register'
import Error from './pages/PageNotFound'
import Games from './pages/Games'
import UserProfile from './pages/UserProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/games' element={<Games />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
