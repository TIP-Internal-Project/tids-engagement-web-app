import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import api from '../api.json'

const API_ROOT = api.ROOT

export interface DeleteTaskState {
	loading: boolean;
	taskId: number;
	status: string;
	updatedBy: string;
	updatedAt: Date | null;
	error: string;
}

const initialState: DeleteTaskState = {
	loading: false,
	taskId: 0,
	status: '',
	updatedBy: '',
	updatedAt: null,
	error: '',
}

interface DeleteTaskPayload {
	taskId: number;
	status: string;
	updatedBy: string;
	updatedAt: Date;
}

export const deleteTask = createAsyncThunk('deleteTask', async (payload: DeleteTaskPayload) => {
	const { taskId, status, updatedBy, updatedAt } = payload
	const response = await axios.put(`${API_ROOT}/task/deleteTask/${taskId}`, { taskId, status, updatedBy, updatedAt })
	return response.data
})

export const deleteTaskSlice = createSlice({
  name: 'deleteTaskt',
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<DeleteTaskState>) => {
		state.loading = false
		state.taskId = action.payload.taskId
		state.status = action.payload.status
		state.updatedBy = action.payload.updatedBy
		state.updatedAt = action.payload.updatedAt
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false
		state.taskId = action.payload.taskId
		state.status = action.payload.status
		state.updatedBy = action.payload.updatedBy
		state.updatedAt = action.payload.updatedAt
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete task.'
      })
  },
})

export const { removeTask } = deleteTaskSlice.actions

export default deleteTaskSlice.reducer

export const deletedTask = (state: RootState) => state.deleteTask