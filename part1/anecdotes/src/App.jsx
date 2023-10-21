import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const length = anecdotes.length
  let indexWithMax = 0;

  const [selected, setSelected] = useState(0)
  const [voteArray, setVoteArray] = useState(new Uint8Array(length))

  const handleVoteClick = () => {
    const copy = [...voteArray]
    copy[selected]++
    setVoteArray(copy)
  }
  
  const handleAnecdoteClick = () => {
    setSelected(Math.floor(Math.random() * length))
  }

  const getMostVotedAnecdote = () => {
    let max = 0;
    for (let i = 0; i < length; i++) {
      if (voteArray[i] > max) {
        max = voteArray[i];
        indexWithMax = i;
      }
    }

    return indexWithMax;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {voteArray[selected]} votes</div>
      <Button text='vote' handleClick={handleVoteClick} />
      <Button text='next anecdote' handleClick={handleAnecdoteClick} />

      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[getMostVotedAnecdote()]}</div>
    </div>
  )
}

export default App