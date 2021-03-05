const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodState = {
        ...state, good: state.good+1
      }
      console.log(goodState)
      return goodState
    case 'OK':
      const okState = {
        ...state, ok: state.ok+1
      }
      console.log(okState)
      return okState
    case 'BAD':
      const badState = {
        ...state, bad: state.bad+1
      }
      console.log(badState)
      return badState
    case 'ZERO':
      console.log(initialState)
      return initialState
    default: return state
  }
  
}

export default counterReducer