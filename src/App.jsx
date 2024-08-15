import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'
import RegisterUser from './pages/RegisterUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard page={1} itemsPerPage={20} />} />

            <Route path="/user/profile" element={<UserProfile />} />

            <Route path="/register/user" element={<RegisterUser />} />

            <Route path="/users/edit/:id" element={<EditUser />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
