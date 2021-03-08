import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.createNotification(`You created '${content}'`, 5)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">Add</button>
        </form>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    createNotification
}

const ConnectedNewAnecdote = connect(
    null,
    mapDispatchToProps
)(NewAnecdote)

export default ConnectedNewAnecdote