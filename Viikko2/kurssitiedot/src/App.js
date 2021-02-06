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
   <ul>
      {parts.map(parts =>
        <Part key={parts.id} parts={parts.name} exercises={parts.exercises} />
      )}
   </ul>
  )
}

const Course = (props) => {
  return(
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts}/>
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