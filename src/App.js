import React, { useState, useEffect, useContext } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

import PrimaryHeader from './components/header/PrimaryHeader'
import Home from './components/home/Home'

function App() {
  return (
    <>
      <div className="container bd-gray-200">
        <div className="row">
          <PrimaryHeader />
        </div>
      </div>

      <Home />
    </>
  )
}

export default App
