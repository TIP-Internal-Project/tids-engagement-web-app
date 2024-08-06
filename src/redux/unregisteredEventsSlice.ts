import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

const API_ROOT = process.env.REACT_APP_API_URL

export interface UnregisteredEventsState {
  loading: boolean
  events: []
  error: string
}

const initialState: UnregisteredEventsState = {
  loading: false,
  events: [],
  error: '',
}

// Generates pending, fulfilled and rejected action types
export const fetchUnregisteredEvents = createAsyncThunk(
  'getUnregisteredEvents',
  async (email: string) => {
    return axios
      .get(`${API_ROOT}/events/getUnregisteredEvents/${email}`)
      .then((response) => response.data)
  }
)

export const unregisteredEventsSlice = createSlice({
  name: 'unregisteredEvents',
  initialState,
  reducers: {
    storeUnregisteredEvents: (state, action: PayloadAction<[]>) => {
      state.events = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUnregisteredEvents.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUnregisteredEvents.fulfilled, (state, action) => {
      state.loading = false
      state.events = action.payload
      state.error = ''
    })
    builder.addCase(fetchUnregisteredEvents.rejected, (state, action) => {
      state.loading = false
      state.events = []
      state.error = action.error.message!
    })
  },
})

export default unregisteredEventsSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getUnregisteredEvents = (state: RootState) => state.unregisteredEvents
