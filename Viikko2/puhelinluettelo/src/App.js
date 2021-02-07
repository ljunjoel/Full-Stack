import React, { useState } from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input
      value = {props.newFilter}
      onChange = {props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit = {props.addPerson}>
        <div>
          name: <input 
          value = {props.newName}
          onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input
          value = {props.newNumber}
          onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

/*const Persons = (props) => {
  return (
    <>
      {props.map(props.person =>
      <Person key={props.person.name} 
      name = {props.person.name}
      number = {props.person.number} />
      )}
    </>
  )
} */


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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <PersonForm addPerson={addPerson}
      newName={newName} handleNameChange = {handleNameChange}
      newNumber={newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
        {filteredPersons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
        )}
    </div>
  )

}

export default App