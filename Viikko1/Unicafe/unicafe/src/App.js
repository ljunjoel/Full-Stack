import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    </tbody>  
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  return (
    <table>
      <StatisticLine text="Good" value={props.good} />
      <StatisticLine text="Neutral" value={props.neutral} />
      <StatisticLine text="Bad" value={props.bad} />
      <StatisticLine text="All" value={props.good + props.neutral + props.bad} />
      <StatisticLine text="Average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)}/>
      <StatisticLine text ="Positive" value={(props.good / (props.good + props.neutral + props.bad) * 100)} />
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={handleGoodClick} text='Good'/>
        <Button handleClick={handleNeutralClick} text='Neutral' />
        <Button handleClick={handleBadClick} text='Bad' />
        <>
        <h1>Statistics</h1>
          <Statistics good={good} neutral={neutral} bad={bad} />
        </>
      </div>
    </div>
  )
}

export default App