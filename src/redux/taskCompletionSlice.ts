import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export interface TaskCompletionState {
  loading: boolean;
  taskId: string;
  email: string;
  completionDate: Date | null;
  error: string;
}

const initialState: TaskCompletionState = {
  loading: false,
  taskId: '',
  email: '',
  completionDate: null,
  error: '',
}

interface CompletePayload {
	taskId: string;
	email: string;
    completionDate: Date;
}

export const completeTask = createAsyncThunk('completeTask', async (payload: CompletePayload) => {
	const { taskId, email, completionDate } = payload
	const response = await axios.post(`http://localhost:3001/task/completeTask/${taskId}/${email}`, { taskId, email, completionDate })
	return response.data
})

export const taskCompletionSlice = createSlice({
  name: 'taskCompletion',
  initialState,
  reducers: {
    addCompletion: (state, action: PayloadAction<TaskCompletionState>) => {
		state.loading = false
     	state.taskId = action.payload.taskId
      	state.email = action.payload.email
        state.completionDate = action.payload.completionDate
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(completeTask.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.loading = false
        state.taskId = action.payload.taskId
        state.email = action.payload.email
        state.completionDate = action.payload.completionDate
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to complete the task.'
      })
  },
})

export const { addCompletion } = taskCompletionSlice.actions

export default taskCompletionSlice.reducer

export const completion = (state: RootState) => state.taskCompletion