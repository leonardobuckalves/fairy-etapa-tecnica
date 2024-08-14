import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard page={1} itemsPerPage={20} />} />

            <Route path="/profile" element={<UserProfile />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
