import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import api from '../api.json'

const API_ROOT = api.ROOT

export interface tasksCountState {
    loading: boolean,
	tasksCount: [],
	error: string
}

const initialState: tasksCountState = {
	loading: false,
	tasksCount: [],
	error: ''
}

export const fetchPendingTasksCount = createAsyncThunk('getPendingTasksCount', async (email: string | null) => {
	return axios
	  .get(API_ROOT + `/overview/getPendingTasksCount/${email}`)
	  .then(response => response.data)
})

export const tasksCountSlice = createSlice({
	name: 'tasksCount',
	initialState,
	reducers: {
		storeTasks: (state, action: PayloadAction<[]>) => {
			state.tasksCount = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchPendingTasksCount.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchPendingTasksCount.fulfilled, (state, action) => {
			state.loading = false
			state.tasksCount = action.payload
			state.error = ''
		})
		builder.addCase(fetchPendingTasksCount.rejected, (state, action) => {
			state.loading = false
			state.tasksCount = []
			state.error = action.error.message!
		})
	}
})

export default tasksCountSlice.reducer

export const getPendingTasksCount = (state: RootState) => state.tasksCount