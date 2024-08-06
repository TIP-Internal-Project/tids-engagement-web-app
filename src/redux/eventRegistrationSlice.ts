import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

const API_ROOT = process.env.REACT_APP_API_URL

export interface EventRegistrationState {
  loading: boolean
  eventId: string
  email: string
  address: string
  error: string
}

const initialState: EventRegistrationState = {
  loading: false,
  eventId: '',
  email: '',
  address: '',
  error: '',
}

interface RegisterPayload {
  eventId: string
  email: string
  address: string
}

export const register = createAsyncThunk('register', async (payload: RegisterPayload) => {
  const { eventId, email, address } = payload
  const response = await axios.post(API_ROOT + '/events/register', { eventId, email, address })
  return response.data
})

export const eventRegistrationSlice = createSlice({
  name: 'eventRegistration',
  initialState,
  reducers: {
    addRegistration: (state, action: PayloadAction<EventRegistrationState>) => {
      state.loading = false
      state.eventId = action.payload.eventId
      state.email = action.payload.email
      state.address = action.payload.address
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.eventId = action.payload.eventId
        state.email = action.payload.email
        state.address = action.payload.location
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to register for the event.'
      })
  },
})

export const { addRegistration } = eventRegistrationSlice.actions

export default eventRegistrationSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.eventRegistration)`
export const registration = (state: RootState) => state.eventRegistration
