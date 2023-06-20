import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import { response } from 'express'
import axios from 'axios'



type Event = {
	eventId: string;
	title: string;
	startDate?: Date;
	startTime?: Date;
	description: string;
	category: string;
	createdDate: Date;
  };

type InitialState = {
	loading: boolean
	events: Event[]
	error: string
	userName: string
}

const initialState: InitialState = {
	loading: false,
	events: [],
	error: '',
	userName: '',
}


export const fetchEvents = createAsyncThunk('fetchEvents', () => {
	return axios.get('http://localhost:3001/events').then(response => response.data)
  	})



const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {},
	extraReducers: builder => {
	  builder.addCase(fetchEvents.pending, state => {
			state.loading = true
	  	})
	  builder.addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
			state.loading = false
			state.events = action.payload
			state.error = ''
	  })
	  builder.addCase(fetchEvents.rejected, (state, action) => {
			state.loading = false
			state.events = []
			state.error = action.error.message || 'Something went wrong'
	  })
	 
	},
  	})
  
  	export default eventSlice.reducer
	 