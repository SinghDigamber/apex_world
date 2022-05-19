import React, { useEffect, useContext, useState } from 'react'
import { slice, sortBy } from 'lodash'
import { ApiContext } from '../../shared/ApiContext'
import Card from '../card/Card'
import Metadata from '../card/Metadata'

function Sidebar() {
  // Fetch data
  const { apiResponse, apiLoader } = useContext(ApiContext)
  const [DATA] = apiResponse

  // Load more
  let continentList = []
  const Limit = 5
  const [index, setIndex] = useState(Limit)
  const initialList = slice(DATA, 0, index)
  const [list, setList] = useState([])
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [isContinentActive, setIsContinentActive] = useState(false)

  const loadMore = () => {
    const newIndex = index + Limit
    setIndex(newIndex)
    setList(slice(DATA, 0, newIndex))
    // console.log(index + ' : ' + DATA.length)
    if (index >= DATA.length) {
      setIsLoadMore(false)
    } else {
      setIsLoadMore(true)
    }
  }

  /*########## Load more onChange ##########*/
  let changeContinentList = []
  const [fakeList, setFakeList] = useState([])
  let changeLimit = 5
  const [changeIndex, setChangeIndex] = useState(changeLimit)
  const [changeList, setChangeList] = useState([])
  const [isChangeLoadMore, setIsChangeLoadMore] = useState(true)

  // Continent filter
  const onChangeContinent = (e) => {
    setIsContinentActive(true)
    setFakeList([])
    setChangeIndex(5)
    changeContinentList = DATA.filter((item) => {
      return e.target.value === 'All'
        ? item
        : item.continents.includes(e.target.value)
    })
    setFakeList(changeContinentList)
    setChangeList(slice(changeContinentList, 0, changeLimit))

    console.log(fakeList.length + ':' + changeIndex)
    if (fakeList.length > changeIndex) {
      setIsChangeLoadMore(true)
    } else {
      setIsChangeLoadMore(false)
    }
  }

  const changeLoadMore = () => {
    const newChangeIndex = changeIndex + Limit
    setChangeIndex(newChangeIndex)
    setChangeList(slice(fakeList, 0, newChangeIndex))
    // console.log(index + ' : ' + DATA.length)
    if (newChangeIndex >= fakeList.length) {
      setIsChangeLoadMore(false)
    } else {
      setIsChangeLoadMore(true)
    }
  }
  /*######## Load more onChange end ########*/

  /*######## Load more no borders start ########*/
  const getNoBorders = () => {
    setIsContinentActive(true)
    setFakeList([])
    setChangeIndex(5)
    const noBorderList = DATA.filter((item) => {
      if (typeof item.borders === 'undefined') {
        return item
      }
    })

    setFakeList(noBorderList)
    setChangeList(slice(noBorderList, 0, changeLimit))

    if (noBorderList.length > changeLimit) {
      setIsChangeLoadMore(true)
    } else {
      setIsChangeLoadMore(false)
    }
  }
  /*######## Load more no borders end ########*/

  /*######## Load more population :- ASC / DSC ########*/
  const populationOrder = (e) => {
    setIsContinentActive(true)
    setFakeList([])
    setChangeIndex(5)
    let sortedList = []

    if (e.target.value === 'High to Low') {
      sortedList = DATA.sort((a, b) => {
        return b.population - a.population
      })
    } else if (e.target.value === 'Low to High') {
      sortedList = DATA.sort((a, b) => {
        return a.population - b.population
      })
    }

    setFakeList(sortedList)
    setChangeList(slice(sortedList, 0, changeLimit))

    if (sortedList.length > changeLimit) {
      setIsChangeLoadMore(true)
    } else {
      setIsChangeLoadMore(false)
    }
  }
  /*######## Load more population :- ASC / DSC ends ########*/

  /*######## Load more population :- UN Members ########*/
  const unMembersFilter = (e) => {
    setIsContinentActive(true)
    setFakeList([])
    setChangeIndex(5)
    let membersList = []

    if (e.target.value === 'showUnMembers') {
      membersList = DATA.filter((item) => {
        if (item.unMember === true) {
          return item
        }
      })
    } else if (e.target.value === 'showNonUnMembers') {
      membersList = DATA.filter((item) => {
        if (item.unMember !== true) {
          return item
        }
      })
    }

    setFakeList(membersList)
    setChangeList(slice(membersList, 0, changeLimit))

    if (membersList.length > changeLimit) {
      setIsChangeLoadMore(true)
    } else {
      setIsChangeLoadMore(false)
    }
  }
  /*######## Load more population :- UN Members ends ########*/

  // Set continents state
  const [continent, setContinent] = useState([])

  // Filter continents
  const removeDuplicate = () => {
    const contArray = []
    continentList = DATA.filter((item, index) => {
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

    // Load more
    if (index >= DATA.length) {
      setIsLoadMore(false)
    } else {
      setIsLoadMore(true)
    }

    // Load more onChange
    // console.log(fakeList)
    // console.log(isChangeLoadMore)

    if (fakeList.length > changeIndex) {
      setIsChangeLoadMore(true)
    } else {
      setIsChangeLoadMore(false)
    }
  }, [DATA, index, isContinentActive, changeIndex, changeList, fakeList])

  return (
    <>
      <div className="col">
        <div className="sidebar">
          <div className="filter-block mb-3 pb-3">
            <p className="mb-2">
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
            <p className="mb-2 mt-4">
              <strong>Population</strong>
            </p>
            <div className="form-check mb-2 pb-2">
              <input
                className="form-check-input"
                type="radio"
                value="High to Low"
                id="htl"
                name="population"
                onChange={populationOrder}
              />
              <label className="form-check-label" htmlFor="htl">
                High to Low
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Low to High"
                id="lth"
                name="population"
                onChange={populationOrder}
              />
              <label className="form-check-label" htmlFor="lth">
                Low to High
              </label>
            </div>
          </div>
          <div className="filter-block d-grid mb-3 pb-3">
            <button
              type="button"
              className="btn btn-dark"
              onClick={(e) => {
                getNoBorders(e, 'value')
              }}
              value={'borders'}
            >
              No Border Countries
            </button>
          </div>
          <div className="filter-block mb-3 pb-3">
            <select
              className="form-select"
              onChange={(e) => {
                unMembersFilter(e)
              }}
            >
              <option value="showUnMembers">Show UN Members</option>
              <option value="showNonUnMembers">Show Non UN Members</option>
            </select>
          </div>
        </div>
      </div>
      {!isContinentActive ? (
        <>
          <div className="col-9">
            <div className="d-flex text-muted pt-3 mb-5">
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">Total Results</h5>
                  <h3>
                    {list.length} of {DATA.length}
                  </h3>
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

              {isLoadMore ? (
                <>
                  <div className="d-grid mt-5 mb-5">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={loadMore}
                      id="showMore"
                    >
                      Load more
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-grid mt-5 mb-5 border-secondary text-center pt-2 pb-2 bg-light shadow-lg p-3 mb-5 bg-body rounded">
                    <strong>
                      <i className="bi bi-emoji-smile me-1"></i> That's all we
                      have.
                    </strong>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="col-9">
            <div className="d-flex text-muted pt-3 mb-5">
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">Total Results</h5>
                  <h3>
                    {changeList.length} of {fakeList.length}
                  </h3>
                </div>
              </div>
            </div>

            <div className="row">
              {changeList?.map((item, index) => {
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

              {isChangeLoadMore ? (
                <>
                  <div className="d-grid mt-5 mb-5">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={changeLoadMore}
                    >
                      Load more
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-grid mt-5 mb-5 border-secondary text-center pt-2 pb-2 bg-light shadow-lg p-3 mb-5 bg-body rounded">
                    <strong>
                      <i className="bi bi-emoji-smile me-1"></i> That's all we
                      have.
                    </strong>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Sidebar
