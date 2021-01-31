import React, { useState } from 'react'

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  return (
    <div>
        <p>Good {props.good}</p>
        <p>Neutral {props.neutral}</p>
        <p>Bad {props.bad}</p>
        <p>All {props.good + props.neutral + props.bad}</p>
        <p>Average {(props.good - props.bad) / (props.good + props.neutral + props.bad)}</p>          <p>Positive {props.good / (props.good + props.neutral + props.bad) * 100} %</p>
    </div>
  )
}

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
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App