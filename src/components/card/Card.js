import React from 'react'

function Card(props) {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
        <div className="card h-100 shadow bg-body rounded">
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Card
