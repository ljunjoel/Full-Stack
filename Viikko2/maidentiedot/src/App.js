import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data.filter(data => data.name.toLowerCase().includes(newFilter.toLowerCase())))
      })
  },[newFilter])
  console.log(countries.length)
  if(countries.length > 10) {
    return(
      <div>
        <div>
          find countries <input
          value={newFilter}
          onChange={handleFilterChange} />
        </div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  if(countries.length < 10 && countries.length > 1) {
    return(
      <div>
        <div>
          find countries <input
          value={newFilter}
          onChange={handleFilterChange} />
        </div>
        {countries.map(country =>
          <p key={country.name}>{country.name}</p>)}
      </div>
    )
  }

  if(countries.length === 1) {
    return(
      <div>
        <div>
          find countries <input
          value={newFilter}
          onChange={handleFilterChange} />
        </div>
        <h1>{countries[0].name}</h1>
        <div>
          <p>Capital {countries[0].capital}</p>
          <p>Population {countries[0].population}</p>
          <h2>Languages</h2>
          <ul>
            {countries[0].languages.map(language =>
              <li key={language.name}>
                {language.name}
              </li>)}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        find countries <input
        value={newFilter}
        onChange={handleFilterChange} />
      </div>
      <p>No matches found</p>
    </div>
  )
  
}

export default App;
