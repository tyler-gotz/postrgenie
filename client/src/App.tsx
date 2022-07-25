import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Clients from './pages/Clients'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'

import './App.css'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/users' element={<Users />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<div>Does not exist loser!!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
