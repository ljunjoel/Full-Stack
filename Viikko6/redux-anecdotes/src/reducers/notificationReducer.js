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

export const createNotification = (content) => {
    return {
        type: 'NEW_NOTIFICATION',
        data: content
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

export default reducer