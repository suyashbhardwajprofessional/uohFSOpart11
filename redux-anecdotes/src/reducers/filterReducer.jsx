import { createSlice, current } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdotesWith(state, action) { return action.payload },
  },
})

export const { filterAnecdotesWith } = filterSlice.actions
export default filterSlice.reducer