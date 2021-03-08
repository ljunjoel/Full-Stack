import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const voteToChange = state.find(n=> n.id === id)
      const changedVote = {
        ...voteToChange,
        votes: voteToChange.votes + 1
      }
      return state.map(vote => vote.id !== id ? vote : changedVote)
    case 'INIT_ANECDOTES':
      return action.data
  default:
    return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        votes: 0
      }
    })
  }
}

export const voteFor = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToLike = anecdotes.find(a => a.id === id)
    const changedAnecdote = { ...anecdoteToLike, votes: anecdoteToLike.votes +1}
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch({
        type:'VOTE',
        data: { id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer