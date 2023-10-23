import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebook'

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

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

    phonebookServices.create(newPersonObject).then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    })
  }
  
  return (
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
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('')

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
      setPersons(newPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />

      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App