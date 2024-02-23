import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import api from '../api.json'

const API_ROOT = api.ROOT

export interface EventRegistrationState {
  loading: boolean;
  eventId: string;
  email: string;
  location: string;
  attendanceType: string;
  registrationDate: Date;
  error: string;
}

const initialState: EventRegistrationState = {
  loading: false,
  eventId: '',
  email: '',
  location: '',
  attendanceType: '',
  registrationDate: new Date(),
  error: '',
}

interface RegisterPayload {
	eventId: string;
	email: string;
  location: string;
  attendanceType: string;
  registrationDate: Date;
}

export const register = createAsyncThunk('register', async (payload: RegisterPayload) => {
	const { eventId, email, location, attendanceType, registrationDate } = payload
	const response = await axios.post(API_ROOT + '/events/register', { eventId, email, location, attendanceType, registrationDate })
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
        state.location = action.payload.location
        state.attendanceType = action.payload.attendanceType
        state.registrationDate = action.payload.registrationDate
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
        state.location = action.payload.location
        state.attendanceType = action.payload.attendanceType
        state.registrationDate = action.payload.registrationDate
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