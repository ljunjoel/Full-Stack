import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.parts} {props.exercises}</p>
  )
}

const Content = ({parts}) => {
  return(
   <>
      {parts.map(parts =>
        <Part key={parts.id} parts={parts.name} exercises={parts.exercises} />
      )}
   </>
  )
}

const Total = ({parts}) => {
  const newParts = parts.map(parts => parts.exercises)
  const total = newParts.reduce((sum, amount)=>sum+amount)
  return(
    <p>Total of {total} exercises</p>
  )
}

const Course = (props) => {
  return(
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    },
    {
      name: 'Redux',
      exercises: 11,
      id: 4
    }
  ]
}  



  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App