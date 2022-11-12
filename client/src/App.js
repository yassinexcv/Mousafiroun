import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/LoginComponent'
import SignUp from './components/SignupComponent'
import Home from './components/HomeComponent'
import Dashboard from './components/DashboardComponent'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <Router>
      <div className="App bg-image" style={{
            backgroundImage:  `url(${process.env.PUBLIC_URL + '/images/bg.svg'})` 
            
        }} >
      
        <div className="">
          <div className="">
            
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Router>
  )
}
export default App