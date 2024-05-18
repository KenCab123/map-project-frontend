import React from 'react'
import Map from "./Components/Map"
import { Route, Routes } from 'react-router-dom'

const App = () => {


  return (

    <div>
      <Routes>
        <Route path="/"element={<Map />}>
        </Route>
      </Routes>
      </div>
  )
}

export default App