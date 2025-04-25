import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    raiseNotification(state, action) {
      const notificationMessage = action.payload
      return notificationMessage
    },
  },
})

/*The below action creator function (redux thunk) performs a twin operation:
  1 dispatch a relevent action to update the application state
  2 dispatch another relevent action to update the application state post a provided interval
  */
export const raiseNotificationThunk = (notificationMessage, timeout) => {
  return dispatch => {
    dispatch(raiseNotification(notificationMessage))
    setTimeout(() => dispatch(raiseNotification('')), timeout * 1000)
  }
}

export const { raiseNotification } = notificationSlice.actions
export default notificationSlice.reducer
