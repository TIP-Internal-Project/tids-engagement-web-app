import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export interface UpdateTaskState {
	loading: boolean;
	taskId: number;
	title: string;
	dueDate: Date | null;
	time: string;
	details: string;
	workdayLink: string;
	myGrowthLink: string;
	importance: string;
	updatedDate: Date | null;
	updatedBy: string;
	error: string;
}

const initialState: UpdateTaskState = {
	loading: false,
	taskId: 0,
	title: '',
	dueDate: null,
	time: '',
	details: '',
	workdayLink: '',
	myGrowthLink: '',
	importance: '',
	updatedDate: null,
	updatedBy: '',
	error: '',
}

interface UpdateTaskPayload {
	taskId: number;
	title: string;
	dueDate: Date;
	time: string;
	details: string;
	workdayLink: string;
	myGrowthLink: string;
	importance: string;
	updatedDate: Date;
	updatedBy: string;
}

export const updateTask = createAsyncThunk('updateTask', async (payload: UpdateTaskPayload) => {
	const { taskId, title, dueDate, time, details, workdayLink, myGrowthLink, importance, updatedDate, updatedBy } = payload
	const response = await axios.put(`http://localhost:3001/task/updateTaskById/${taskId}`, { title, dueDate, time, details, workdayLink, myGrowthLink, importance, updatedDate, updatedBy })
	return response.data
})

export const updateTaskSlice = createSlice({
  name: 'updateTask',
  initialState,
  reducers: {
    editTask: (state, action: PayloadAction<UpdateTaskState>) => {
		state.loading = false
		state.taskId = action.payload.taskId
		state.title = action.payload.title
		state.dueDate = action.payload.dueDate
		state.time = action.payload.time
		state.details = action.payload.details
		state.workdayLink = action.payload.workdayLink
		state.myGrowthLink = action.payload.myGrowthLink
		state.importance = action.payload.importance
		state.updatedDate = action.payload.updatedDate
		state.updatedBy = action.payload.updatedBy
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false
		state.taskId = action.payload.taskId
		state.title = action.payload.title
		state.dueDate = action.payload.dueDate
		state.time = action.payload.time
		state.details = action.payload.details
		state.workdayLink = action.payload.workdayLink
		state.myGrowthLink = action.payload.myGrowthLink
		state.importance = action.payload.importance
		state.updatedDate = action.payload.updatedDate
		state.updatedBy = action.payload.updatedBy
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to update task.'
      })
  },
})

export const { editTask } = updateTaskSlice.actions

export default updateTaskSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.eventRegistration)`
export const updatedTask = (state: RootState) => state.updateTask