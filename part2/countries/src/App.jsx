import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Result = ({ countryResults, setCountryResults, weatherData, setWeatherData }) => {
  const handleShowCountry = name => () => {
    countriesService.getByName(name)
      .then(singleCountry => {
        setCountryResults(singleCountry)

        countriesService.getWeather(singleCountry.capital).then(weather => {
          setWeatherData(weather)
        })
      })
  }

  if (countryResults === null || weatherData === null) return null

  if (typeof countryResults === 'string') {
    return <div>{countryResults}</div>
  }

  if (Array.isArray(countryResults)) {
    return (
      <div>
        {countryResults.map(name => 
          <div key={name}>
            {name}
            <button onClick={handleShowCountry(name)}>show</button>
          </div>  
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>{countryResults.name.common}</h1>
      <div>capital {countryResults.capital}</div>
      <div>area {countryResults.area}</div>

      <h4>languages:</h4>
      <ul>
        {Object.keys(countryResults.languages).map(key => ( 
          <li key={key}>{countryResults.languages[key]}</li>      
        ))}
      </ul>
      <img src={countryResults.flags.png} alt={`${countryResults.name.common} flag`} />

      <h2>Weather in {weatherData.location.name}</h2>
      <div>temperature {weatherData.current.temp_c} Celcius</div>
      <img src={`https://${weatherData.current.condition.icon.substr(2)}`} alt={`${weatherData.current.condition.text} icon`} />
      <div>wind {weatherData.current.wind_mph} mph</div>
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [searchedCountry, setSearchedCountry] = useState(null)
  const [countryResults, setCountryResults] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  
  useEffect(() => {
    if (searchedCountry) {
      countriesService.getAll().then(countries => {
        const countryNames = []
        for (const country of countries) {
          countryNames.push(country.name.common)
        }

        const filteredCountries = 
          countryNames.filter(name => 
            name.toLowerCase().includes(searchedCountry.toLowerCase()))

        if (filteredCountries.length > 10) {
          setCountryResults('too many')
        } else if (filteredCountries.length > 1) {
          setCountryResults(filteredCountries)
        } else if (filteredCountries.length === 1) {
          countriesService.getByName(filteredCountries)
            .then(singleCountry => {
              setCountryResults(singleCountry)

              countriesService.getWeather(singleCountry.capital).then(weather => {
                setWeatherData(weather)
              })
            })
        } else {
          setCountryResults('not found')
        }
      })
    }
  }, [searchedCountry])

  const onSearch = event => {
    event.preventDefault()
    setSearchedCountry(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find country: 
        <input value={value} onChange={(e) => {setValue(e.target.value)}} />
        <button type='submit'>find</button>
      </form>
      <Result 
        countryResults={countryResults} 
        setCountryResults={setCountryResults}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
    </div>
  )
}

export default App