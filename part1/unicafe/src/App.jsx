import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 & neutral === 0 & bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>no feedback given</div>
      </div>
    )
  }
  
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  return (
    <div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </div>
  )
}

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (value, setValue) => () => setValue(value + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleClick(good, setGood)} />
      <Button text='neutral' handleClick={handleClick(neutral, setNeutral)} />
      <Button text='bad' handleClick={handleClick(bad, setBad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App