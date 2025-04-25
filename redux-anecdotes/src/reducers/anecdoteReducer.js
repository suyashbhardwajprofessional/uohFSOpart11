import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnAnecdote(state, action) {
      const votedAnecdoteId = action.payload
      const anecdoteToVote = state.find(anecdoteObj=>anecdoteObj.id === votedAnecdoteId)
      const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes+1 }
      return state.map(theAnecdote => theAnecdote.id !== votedAnecdoteId ? theAnecdote : votedAnecdote)
    },
    createAnAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})


/*The below action creator function (redux thunk) performs a twin operation: 
  1 asynchronous comm with db, 
  2 dispatch a relevent action to update the application state
  */
export const initializeAnecdotesFromThunk = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()  
    dispatch(setAnecdotes(anecdotes))
  }
}

/*The below action creator function (redux thunk) performs a twin operation: 
  1 asynchronous comm with db, 
  2 dispatch a relevent action to update the application state
  */
export const createAnecdoteFromThunk = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnAnecdote(newAnecdote))
  }
}

/*The below action creator function (redux thunk) performs a twin operation: 
  1 asynchronous comm with db, 
  2 dispatch a relevent action to update the application state
  */
export const voteAnecdoteFromThunk = (anecdoteToVote) => {
  return async (dispatch) => {
    const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes+1 }
    const response = await anecdoteService.updateOne(anecdoteToVote.id, votedAnecdote)
    dispatch(voteAnAnecdote(anecdoteToVote.id))
  }
}

export const { voteAnAnecdote, createAnAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer