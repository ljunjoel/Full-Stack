import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <li>
            {anecdote.content}
            <strong> has {anecdote.votes} votes <button onClick={handleClick}>Vote</button></strong>
        </li>
    )
}

const Notes = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    return(
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={()=> dispatch(voteFor(anecdote.id))
                }
                />
            )}
        </ul>
    )
}

export default Notes