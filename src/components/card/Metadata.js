import React from 'react'

function Metadata(props) {
  return (
    <div>
      <div className="img-block">
        <img
          src={props.flag}
          className="card-img-top"
          alt={props.countryName}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.countryName}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Capital:</strong> {props.capital}
        </li>
        <li className="list-group-item">
          <strong>Population:</strong> {props.population}
        </li>
        <li className="list-group-item">
          <strong>Continent:</strong> {props.continent}
        </li>
        <li className="list-group-item">
          <strong className="me-2">Borders:</strong>
          {props.countryBorder === undefined ? (
            <span className="btn btn-danger btn-sm disabled">
              Doesn't share border
            </span>
          ) : (
            props.countryBorder?.map((item, index) => {
              return (
                <span
                  className="btn btn-outline-secondary btn-sm me-1 mb-1"
                  key={index}
                >
                  {item.toLowerCase()}
                </span>
              )
            })
          )}
        </li>
      </ul>
      <div className="card-body">
        <div className="d-grid">
          <a
            className="btn btn-outline-dark"
            href={props.viewGoogleMap}
            target="_blank"
            rel="noreferrer"
          >
            View on Goolge map
          </a>
        </div>
      </div>
    </div>
  )
}

export default Metadata
