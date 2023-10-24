import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebook'

const Notification = ({ message, isError }) => {
  if (message === null) return null
  
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={(isError) ? errorStyle : successStyle}>
      {message}
    </div>
  )
}

const Persons = ({ filteredPersons, deletePerson }) => (
  <div>
    {filteredPersons.map(person => 
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </div>
    )}
  </div>
)

const Filter = ({ nameFilter, setNameFilter }) => (
  <div>
    filter shown with
    <input value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
  </div>
)

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addNewPerson }) => (
  <form onSubmit={addNewPerson}>
    <div>
      name: <input value={newName} onChange={e => setNewName(e.target.value)} />
    </div>
    <div>
      number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const addNewPerson = (event) => {
    event.preventDefault()

    for (const person of persons) {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        if (confirm(`${person.name} already added to phonebook, replace the old number with the new one?`)) {
          const updatedPerson = {...person, number: newNumber}
          
          phonebookServices.update(person.id, updatedPerson).then(returnedPerson => {
            setPersons(persons.map(p => (p.id !== person.id) ? p : returnedPerson))
            setNewName('')
            setNewNumber('')

            setIsError(false)
            setMessage(`Changed number for ${returnedPerson.name}`)
            setTimeout(() => {setMessage(null)}, 3000)
          })
            .catch(error => {
              setIsError(true)
              setMessage(`${person.name} has already been deleted from server`)
              setTimeout(() => {setMessage(null)}, 3000)
              phonebookServices.getAll().then(initialPersons => {
                setPersons(initialPersons)
              })
            })
        }

        return
      }
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    phonebookServices.create(newPersonObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')

      setIsError(false)
      setMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => {setMessage(null)}, 3000)
    })
  }

  useEffect(() => {
    phonebookServices.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  const deletePerson = id => {
    const deletedPerson = persons.find(person => person.id === id)
    if (confirm(`Delete ${deletedPerson.name}?`)) {
      const newPersons = persons.filter(person => person !== deletedPerson)
      phonebookServices.remove(id)
        .catch(error => {
          setIsError(true)
          setMessage(`${deletedPerson.name} has already been deleted from server`)
          setTimeout(() => {setMessage(null)}, 3000)
          phonebookServices.getAll().then(initialPersons => {
            setPersons(initialPersons)
          })
        })
      setPersons(newPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />

      <h2>add a new</h2>
      <PersonForm 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber}
        addNewPerson={addNewPerson}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App