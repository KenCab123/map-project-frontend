import React from 'react'
import Map from "./Components/Map"
import { Route, Routes } from 'react-router-dom'
import "./App.css"

const App = () => {


  return (

    <div className='page-wrap'>
      <Routes>
        <Route path="/"element={<Map />}>
        </Route>
      </Routes>
      </div>
  )
}

export default App