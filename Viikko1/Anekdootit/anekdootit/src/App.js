import React, { useState } from 'react'
const Button = (props) => {
  return (
    <div>
     <button onClick={props.handleClick}>
     {props.text}
      </button>
    </div>
  )  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    all: new Array(6+1).join('0').split('').map(parseFloat),
    most: 0
  })
  //const [mostVoted, setMostVoted] = useState(0)
  
  /*const getMostVoted = () => {
    let i = votes.indexOf(Math.max(...votes));
    console.log(i)
    setMostVoted(i)
  }*/
  const handleRandomClick = () => {
    setSelected(Math.floor(Math.random() * 6))
  }
  const handleVoteClick = () => {
    const copy = {...votes}
    copy.all[selected] += 1
    console.log(copy.all[selected])
    copy.most = copy.all.indexOf(Math.max(...copy.all))
    console.log(copy.most)
    console.log(copy)
    setVotes(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>This anecdote has {votes.all[selected]} votes</p>
      <Button handleClick={handleVoteClick} text='Vote' />
      <Button handleClick={handleRandomClick} text='Random Anecdote' />
      <h1>Most Voted Anecdote</h1>
      {anecdotes[votes.most]}
      <p>has {votes.all[votes.most]} votes</p>
    </div>
  )
}

export default App
