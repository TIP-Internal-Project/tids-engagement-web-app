import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import api from '../api.json'

const API_ROOT = api.ROOT

export interface OverviewTasksState {
    loading: boolean,
	tasks: [],
	error: string
}

const initialState: OverviewTasksState = {
	loading: false,
	tasks: [],
	error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchTasks = createAsyncThunk('getTasks', () => {
	return axios
	  .get(API_ROOT + '/overview/getTasks')
	  .then(response => response.data)
})

export const overviewTasksSlice = createSlice({
	name: 'overviewTasks',
	initialState,
	reducers: {
		storeOverviewTasks: (state, action: PayloadAction<[]>) => {
			state.tasks = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchTasks.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchTasks.fulfilled, (state, action) => {
			state.loading = false
			state.tasks = action.payload
			state.error = ''
		})
		builder.addCase(fetchTasks.rejected, (state, action) => {
			state.loading = false
			state.tasks = []
			state.error = action.error.message!
		})
	}
})

export default overviewTasksSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getOverviewTasks = (state: RootState) => state.overviewTasks