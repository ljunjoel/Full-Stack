import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

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

const Notification = ({ message, error }) => {
  console.log(error, message)
  if (message === null) {
    return null
  }
  if(error) {
    return( 
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

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
              setMessage(`${returnedPerson.name} was updated successfully`)
            })
            .catch(error => {
              setError(true)
              setMessage(`Information of ${personObject.name} has already been removed from server`)
              setTimeout(() => {
              setError(false);
              setMessage('')
            }, 5000);
            setPersons(persons.filter(p => p.id !== person.id))
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
          setMessage(`${returnedPerson.name} was added successfully`)
        })
    }
  }

  const removePerson = (id) => {
    const removed = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${removed.name}?`)) {
      personService
        .remove(id)
        setPersons(persons.filter(p=>p.id !== id))
        setMessage(`${removed.name} was deleted successfully`)
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('')}, 5000);
      return () => clearTimeout(timer);
  }, [message])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
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