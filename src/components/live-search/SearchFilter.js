/*
Live Search
*/

import React, { useEffect, useState, useContext } from 'react'
import { ApiContext } from '../../shared/ApiContext'
import '../live-search/SearchFilter.css'
import Loader from '../loader/Loader'

export default function SearchFilter() {
  // Get data from context
  const { apiLoader, apiResponse } = useContext(ApiContext)

  // Get loader response
  const [showLoader] = apiLoader

  // Get data from context
  const [country] = apiResponse

  // Set data for live search filter
  const [countryData, setCountryData] = useState([])

  // Set search input state
  const [inputState, setInputState] = useState('')

  // Set no data state
  const [noRecord, setNoRecord] = useState(false)

  // Set search filter active list items state
  const [activeIndex, setActiveIndex] = useState()

  const onSearchValChange = (e) => {
    // Set search input state when users types
    setInputState(e.target.value)

    if (e.target.value === '') {
      // Empty the countryData when no text in search input
      setCountryData([])

      // Set no records state to false, when no text in search input
      setNoRecord(false)
    } else {
      // Get filter data using country array search
      let result = country?.filter((item) => {
        return item.name.common
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      })

      // Set condition when filter result is zero
      if (result.length === 0) {
        // Show no records HTML
        setNoRecord(true)

        // Empty country data when filter data is not  available
        setCountryData([])
      } else {
        // Set country data when country data is available
        setCountryData(result)

        // Hide no records HTML
        setNoRecord(false)
      }
    }
  }

  const handleOnClick = (index) => {
    setActiveIndex(index)
  }

  const removeSearch = () => {
    setInputState('')
    setCountryData([])
    setNoRecord(false)
  }

  useEffect(() => {
    // Set event listener, it triggers event when any activity happens in search input
    // Following approach, doesn't throw error when onSearchValChange is not rendered initially
    let searchEle = document.getElementById('liveSearch')
    if (searchEle) {
      searchEle.addEventListener('mousedown', onSearchValChange)
    }
  })

  return (
    <div className="instant-search col-md-4">
      {showLoader ? (
        <Loader />
      ) : (
        <div className="position-relative w-100">
          <div className="input-group input-group-lg">
            <input
              type="text"
              className="form-control"
              id="liveSearch"
              placeholder="Search ..."
              onChange={onSearchValChange}
              value={inputState}
            />
            <span
              className="input-group-text bg-warning"
              id="inputGroup-sizing-lg"
            >
              {inputState !== '' ? (
                <i
                  className="bi bi-x-lg remove-search"
                  onClick={removeSearch}
                ></i>
              ) : (
                <i className="bi bi-search"></i>
              )}
            </span>
          </div>

          <ul className="list-group position-absolute w-100">
            {countryData?.map((res, index) => {
              return (
                <li
                  onClick={() => {
                    handleOnClick(index)
                  }}
                  key={index}
                >
                  <a
                    href={res.maps.googleMaps}
                    className={
                      activeIndex === index
                        ? 'list-group-item list-group-item-action active'
                        : 'list-group-item list-group-item-action'
                    }
                    aria-current="true"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={res.flags.svg}
                      style={{ width: '30px', height: '30px' }}
                      className="rounded-circle me-2"
                      alt={res.name.common}
                    />
                    {res.name.common}
                  </a>
                </li>
              )
            })}
          </ul>

          {noRecord && (
            <ul className="list-group position-absolute w-100">
              <li className="list-group-item disabled">
                <strong>
                  <i className="bi bi-emoji-frown me-1"></i> No record found
                </strong>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
