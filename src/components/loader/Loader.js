import React from 'react'

function Loader() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loader
