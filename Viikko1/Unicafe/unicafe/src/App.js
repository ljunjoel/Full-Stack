import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <button onClick={()=> setGood(good + 1)}>
          Good
        </button>
        <button onClick={()=> setNeutral(neutral + 1)}>
          Neutral
        </button>
        <button onClick={()=> setBad(bad + 1)}>
          Bad
        </button>
        <h1>Statistics</h1>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {good + neutral + bad}</p>
        <p>Average {(good - bad) / (good + neutral + bad)}</p>
        <p>Positive {good / (good + neutral + bad) * 100} %</p>
      </div>
    </div>
  )
}

export default App