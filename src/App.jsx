import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/Locationinfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'

function App() {

  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    axios.get(url)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(ture)
      })
  },[numberLocation])

    const handleSubmit = e => {
      e.preventDefault()
      if (e.target.inputLocation.value.trim().length === 0) {
        setNumberLocation(getRandomLocation())
      } else {
        setNumberLocation(e.target.inputLocation.value.trim())
      }
      e.target.inputLocation.value = e.target.inputLocation.value.trim()
    }

  return (
    <div className="app">
      <div className='app__container-img-title back__img'>
        <h1 className='app__title'>Rick and Morty</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input className='form__input' id='inputLocation' type="text" />
          <button className='form__btn'>Search</button>
        </form>
      </div>
      {
        hasError ?
          <h2 className='app__error'>Hey! you must provide an id from 1 to 126</h2>
        :
          <>
            <LocationInfo location={location} />
            <div className='residents__container'>
              {
                location?.residents.map(url => (
                  <ResidentInfo 
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>
  )
}

export default App
