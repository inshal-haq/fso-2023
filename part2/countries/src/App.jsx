import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Result = ({ countryResults, setCountryResults }) => {

  const handleShowCountry = name => () => {
    countriesService.getByName(name)
      .then(singleCountry => {setCountryResults(singleCountry)})
  }

  if (countryResults === null) return null

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
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [searchedCountry, setSearchedCountry] = useState(null)
  const [countryResults, setCountryResults] = useState(null)
  
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
            .then(singleCountry => {setCountryResults(singleCountry)})
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
      />
    </div>
  )
}

export default App