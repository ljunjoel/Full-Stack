import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <li>
            {anecdote.content}
            <strong> has {anecdote.votes} votes <button onClick={handleClick}>Vote</button></strong>
        </li>
    )
}

const Anecdotes = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const voteHandler = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(voteFor(id))
        dispatch(createNotification(`You voted for '${anecdote.content}'`, 5))
    }

    return(
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => voteHandler(anecdote.id)}
                />
            )}
        </ul>
    )
}

export default Anecdotes