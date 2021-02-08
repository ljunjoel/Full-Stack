import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'

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
    <p>
      {props.name} {props.number} 
      <button onClick={()=>props.setRemover(props.id)}>
      Delete
      </button>
    </p>
  )
}

const Persons = ({persons, setRemover}) => {
  return (
    <>
      {persons.map(person =>
      <Person key={person.name} 
      name = {person.name}
      number = {person.number}
      id = {person.id}
      setRemover={setRemover}
      />
      )}
    </>
  )
} 


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const names = persons.map(person => person.name)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (names.includes(newName)) {
      const person = persons.find(p => p.name === newName)
      if(person.number === newNumber) {
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
      } else {
        if (window.confirm(`${person.name} is already added to phonebook. Replace old number with the new one?`)) {
          const personObject = {
            name: newName,
            number: newNumber
            }
          personService
            .update(person.id, personObject)
            .then (returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
        } else {
          setNewName('')
          setNewNumber('')
        }
      }
      
    } else {  
      const personObject = {
      name: newName,
      number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (id) => {
    const removed = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${removed.name}?`)) {
      personService
        .remove(id)
        setPersons(persons.filter(p=>p.id !== id))
    } else {
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
        <Persons  persons = {persons} setRemover={removePerson} />
    </div>
  )
  
}

export default App