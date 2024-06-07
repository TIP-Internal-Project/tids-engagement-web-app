import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import api from '../api.json'

const API_ROOT = api.ROOT

export interface OverviewEventsState {
    loading: boolean,
	events: [],
	error: string
}

const initialState: OverviewEventsState = {
	loading: false,
	events: [],
	error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchEvents = createAsyncThunk('getEvents', () => {
	return axios
	  .get(API_ROOT + '/overview/getEvents')
	  .then(response => response.data)
})

export const overviewEventsSlice = createSlice({
	name: 'overviewEvents',
	initialState,
	reducers: {
		storeOverviewEvents: (state, action: PayloadAction<[]>) => {
			state.events = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchEvents.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchEvents.fulfilled, (state, action) => {
			state.loading = false
			state.events = action.payload
			state.error = ''
		})
		builder.addCase(fetchEvents.rejected, (state, action) => {
			state.loading = false
			state.events = []
			state.error = action.error.message!
		})
	}
})

export default overviewEventsSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getOverviewEvents = (state: RootState) => state.overviewEvents