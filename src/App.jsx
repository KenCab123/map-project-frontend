import React from 'react'
import Map from "./Components/Map"
import { Route, Routes, Link } from 'react-router-dom'
import AboutDevs from "./Components/AboutDevs"
import "./App.css"

const App = () => {


  return (

    <div className='page-wrap'>
      <Link to="/" className='app-name-link'>
      <h1 className='app-name'>BulletProof NYC</h1>
      </Link>
      <Link to="/about" className='about-link'>
      <h2 className='about-link-head'>About Us</h2>
      </Link>
      <Routes>
        <Route path="/"element={<Map />}></Route>
        <Route path="about" element={<AboutDevs/>}/>
      </Routes>
      </div>
  )
}

export default App