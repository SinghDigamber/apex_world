import React from 'react'

export default function PrimaryHeader() {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 border-bottom">
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <i className="bi bi-flower1 fs-4 me-2" />
        <strong className="fs-4">Apex World</strong>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <a href="#" className="nav-link link-dark active" aria-current="page">
            Home
          </a>
        </li>
      </ul>
    </header>
  )
}
