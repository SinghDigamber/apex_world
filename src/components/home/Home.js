import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import SearchFilter from '../live-search/SearchFilter'
import SharedData from '../../shared/SharedData'

function Home() {
  return (
    <div className='home-main'>
      <SharedData>
        <div className="world-banner mb-5 d-flex align-items-center justify-content-center">
          <SearchFilter />
        </div>
        <div className="container">
          <div className="row">
            <Sidebar />
          </div>
        </div>
      </SharedData>
    </div>
  )
}

export default Home
