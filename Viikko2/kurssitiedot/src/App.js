import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
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
      <Header name={props.name} />
      <Content parts={props.parts}/>
      <Total parts={props.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
  {
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
},
{
  name: 'Node.js',
  id: 2,
  parts: [
    {
      name: 'Routing',
      exercises: 3,
      id: 1
    },
    {
      name: 'Middlewares',
      exercises: 7,
      id: 2
    }
  ]
}
]  



  return (
    <div>
      {courses.map((course) =>
      <Course key={course.id} name={course.name} parts={course.parts} />
      )}
    </div>
  )
}

export default App