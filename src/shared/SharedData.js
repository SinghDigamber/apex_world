import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { ApiContext } from './ApiContext'

export default function SharedData({ children }) {
  const [country, setCountry] = useState([])
  const [showLoader, setShowLoader] = useState(true)

  const API = 'https://restcountries.com/v3.1/all'

  const fetchData = useCallback(() => {
    axios
      .get(API)
      .then((res) => {
        if (res.statusText === 'OK') {
          setCountry(res.data)
          setShowLoader(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [country])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <ApiContext.Provider
        value={{
          apiResponse: [country, setCountry],
          apiLoader: [showLoader, setShowLoader],
        }}
      >
        {children}
      </ApiContext.Provider>
    </div>
  )
}
