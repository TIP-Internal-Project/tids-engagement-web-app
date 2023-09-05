import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export interface CompletedTasksState {
    loading: boolean,
	tasks: [],
	error: string
}

const initialState: CompletedTasksState = {
	loading: false,
	tasks: [],
	error: ''
}

export const fetchCompletedTasks = createAsyncThunk('getCompletedTasks', async (email: string) => {
	return axios
	  .get(`http://localhost:3001/task/getCompletedTasks/${email}`)
	  .then(response => response.data)
})

export const completedTasksSlice = createSlice({
	name: 'completedTasks',
	initialState,
	reducers: {
		storeCompletedTasks: (state, action: PayloadAction<[]>) => {
			state.tasks = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchCompletedTasks.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchCompletedTasks.fulfilled, (state, action) => {
			state.loading = false
			state.tasks = action.payload
			state.error = ''
		})
		builder.addCase(fetchCompletedTasks.rejected, (state, action) => {
			state.loading = false
			state.tasks = []
			state.error = action.error.message!
		})
	}
})

export default completedTasksSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getCompletedTasks = (state: RootState) => state.completedTasks