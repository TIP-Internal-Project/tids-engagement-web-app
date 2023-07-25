import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export interface taskState {
    loading: boolean,
	tasks: [],
	error: string
}

const initialState: taskState = {
	loading: false,
	tasks: [],
	error: ''
}

export const fetchTasks = createAsyncThunk('getAllTasks', () => {
	return axios
	  .get('http://localhost:3001/task/getAllTasks')
	  .then(response => response.data)
})

export const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		storeTasks: (state, action: PayloadAction<[]>) => {
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

export default taskSlice.reducer

export const getTasks = (state: RootState) => state.tasks