import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebook'

const Persons = ({ filteredPersons }) => (
  <div>
    {filteredPersons.map(person => 
      <div key={person.id}>{person.name} {person.number}</div> 
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
      if (person.name === newName) {
        alert(`${newName} already added to phonebook`)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />

      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App