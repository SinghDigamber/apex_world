import React, { useEffect, useContext, useState } from 'react'
import { slice } from 'lodash'
import { ApiContext } from '../../shared/ApiContext'
import Card from '../card/Card'
import Metadata from '../card/Metadata'

function Sidebar() {
  // Fetch data
  const { apiResponse, apiLoader } = useContext(ApiContext)
  const [DATA] = apiResponse
  // Set continents state
  const [continent, setContinent] = useState([])

  // Dynamic Show More
  const Limit = 5
  const [index, setCurrentIndex] = useState(Limit)
  const initialList = slice(DATA, 0, index)
  const [list, setList] = useState([]) // Use this state for all filters
  const [loadMore, setLoadMore] = useState(true)

  const showLoadMore = () => {
    const newIndex = index + Limit
    setCurrentIndex(newIndex)
    const newList = slice(DATA, 0, newIndex)
    setList(newList)
  }

  // Continent filter
  const onChangeContinent = (e) => {
    let continentList = DATA.filter((item) => {
      return e.target.value === 'All'
        ? item
        : item.continents.includes(e.target.value)
    })
    setList(continentList)
  }

  // Filter continents
  const removeDuplicate = () => {
    const contArray = []
    DATA.filter((item, index) => {
      return contArray.push(item.continents[0])
    })

    // Remove duplicate
    return contArray.filter((item, index) => {
      return contArray.indexOf(item) === index
    })
  }

  useEffect(() => {
    setContinent(removeDuplicate())
    setList(initialList)
  }, [DATA, loadMore])

  return (
    <>
      <div className="col">
        <div className="sidebar">
          <div className="filter-block mb-3 pb-3">
            <p className="mb-3">
              <strong>Continents</strong>
            </p>

            <select
              className="form-select"
              onChange={(e) => {
                onChangeContinent(e)
              }}
              id="continentChange"
            >
              <option defaultValue>All</option>
              {continent?.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                )
              })}
            </select>
            <p className="mb-2 mt-3">
              <strong>Population</strong>
            </p>
            <select className="form-select">
              <option>Random</option>
              <option value="1">High to Low</option>
              <option value="2">Low to High</option>
            </select>
          </div>
          <div className="filter-block d-grid mb-3 pb-3">
            <button type="button" className="btn btn-outline-danger">
              Countries with no border
            </button>
          </div>
          <div className="filter-block mb-3 pb-3">
            <select className="form-select">
              <option value="1">Show UN Members</option>
              <option value="2">Show Non UN Members</option>
            </select>
          </div>
        </div>
      </div>
      <div className="col-9">
        <div className="d-flex text-muted pt-3 mb-5">
          <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div className="d-flex justify-content-between">
              <h5 className="fw-bold">Total Results</h5>
              <h3>{list.length}</h3>
            </div>
          </div>
        </div>

        <div className="row">
          {list?.map((item, index) => {
            return (
              <Card key={index}>
                <Metadata
                  flag={item.flags.svg}
                  countryName={item.name.common}
                  capital={item.capital}
                  population={item.population}
                  continent={item.continents}
                  viewGoogleMap={item.maps.googleMaps}
                  countryBorder={item.borders}
                />
              </Card>
            )
          })}

          {loadMore ? (
            <div className="d-grid mt-5 mb-5">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={showLoadMore}
                id="showMore"
              >
                Show more
              </button>
            </div>
          ) : (
            <div className="d-grid mt-5 mb-5 border border-secondary text-center pt-2">
              <p>
                <i className="bi bi-emoji-smile me-1"></i> That's all we have.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar
