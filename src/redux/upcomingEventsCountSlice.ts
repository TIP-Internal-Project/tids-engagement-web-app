import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import api from '../api.json'

const API_ROOT = api.ROOT

export interface eventsCountState {
    loading: boolean,
	eventsCount: [],
	error: string
}

const initialState: eventsCountState = {
	loading: false,
	eventsCount: [],
	error: ''
}

export const fetchUpcomingEventsCount = createAsyncThunk('getUpcomingEventsCount', () => {
	return axios
	  .get(API_ROOT + '/overview/getUpcomingEventsCount')
	  .then(response => response.data)
})

export const eventsCountSlice = createSlice({
	name: 'eventsCount',
	initialState,
	reducers: {
		storeTasks: (state, action: PayloadAction<[]>) => {
			state.eventsCount = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchUpcomingEventsCount.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchUpcomingEventsCount.fulfilled, (state, action) => {
			state.loading = false
			state.eventsCount = action.payload
			state.error = ''
		})
		builder.addCase(fetchUpcomingEventsCount.rejected, (state, action) => {
			state.loading = false
			state.eventsCount = []
			state.error = action.error.message!
		})
	}
})

export default eventsCountSlice.reducer

export const getUpcomingEventsCount = (state: RootState) => state.eventsCount