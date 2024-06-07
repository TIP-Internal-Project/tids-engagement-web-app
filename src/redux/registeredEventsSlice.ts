import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import api from '../api.json'

const API_ROOT = api.ROOT

export interface RegisteredEventsState {
    loading: boolean,
	events: [],
	error: string
}

const initialState: RegisteredEventsState = {
	loading: false,
	events: [],
	error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchRegisteredEvents = createAsyncThunk('getRegisteredEvents', async (email: string) => {
	return axios
	  .get(`${API_ROOT}/events/getRegisteredEvents/${email}`)
	  .then(response => response.data)
})

export const registeredEventsSlice = createSlice({
	name: 'registeredEvents',
	initialState,
	reducers: {
		storeRegisteredEvents: (state, action: PayloadAction<[]>) => {
			state.events = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchRegisteredEvents.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchRegisteredEvents.fulfilled, (state, action) => {
			state.loading = false
			state.events = action.payload
			state.error = ''
		})
		builder.addCase(fetchRegisteredEvents.rejected, (state, action) => {
			state.loading = false
			state.events = []
			state.error = action.error.message!
		})
	}
})

export default registeredEventsSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getRegisteredEvents = (state: RootState) => state.registeredEvents