const notificationAtStart = 'Fakka yuu, Kratos!'

const initialState = notificationAtStart

const reducer = ( state = initialState, action ) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
      case 'NEW_NOTIFICATION':
          const newNotification = action.data
          return newNotification
      case 'REMOVE':
          const remove = ''
          return remove
  default:
      return state
  }
}

let timeoutId = undefined

export const createNotification = (content, delay) => {
    console.log('This is ID prior to running: ', timeoutId)
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: content
        },
        console.log('This is ID prior to clearing: ', timeoutId),
        clearTimeout(timeoutId),
        console.log('This is ID post-clear: ', timeoutId),
        timeoutId = setTimeout(() => {
            dispatch(removeNotification())
        }, delay * 1000),
        console.log('This is the new ID: ', timeoutId))
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

export default reducer