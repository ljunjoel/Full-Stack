import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const names = persons.map(person => person.name)

  const addPerson = (event) => {
    event.preventDefault()
    console.log(names)
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {  
      const personObject = {
      name: newName,
      number: newNumber
      }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }
  }
  
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input
        value = {newFilter}
        onChange = {handleFilterChange} />
      </div>
      <form onSubmit = {addPerson}>
        <div>
          name: <input 
          value = {newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
          value = {newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {filteredPersons.map(person =>
        <p key={person.name} >
          {person.name} {person.number}
        </p>)}
    </div>
  )

}

export default App