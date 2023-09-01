import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export interface IncompleteTasksState {
    loading: boolean,
	tasks: [],
	error: string
}

const initialState: IncompleteTasksState = {
	loading: false,
	tasks: [],
	error: ''
}

export const fetchIncompleteTasks = createAsyncThunk('getIncompleteTasks', async (email: string) => {
	return axios
	  .get(`http://localhost:3001/task/getIncompleteTasks/${email}`)
	  .then(response => response.data)
})

export const incompleteTasksSlice = createSlice({
	name: 'incompleteTasks',
	initialState,
	reducers: {
		storeIncompleteTasks: (state, action: PayloadAction<[]>) => {
			state.tasks = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchIncompleteTasks.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchIncompleteTasks.fulfilled, (state, action) => {
			state.loading = false
			state.tasks = action.payload
			state.error = ''
		})
		builder.addCase(fetchIncompleteTasks.rejected, (state, action) => {
			state.loading = false
			state.tasks = []
			state.error = action.error.message!
		})
	}
})

export default incompleteTasksSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getIncompleteTasks = (state: RootState) => state.incompleteTasks