import reactDom from "react-dom";
import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h2>{props.name}</h2>
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

  export default Course