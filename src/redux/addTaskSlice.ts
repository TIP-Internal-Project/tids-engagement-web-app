import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

const API_ROOT = process.env.REACT_APP_API_URL

export interface AddTaskState {
  loading: boolean
  title: string
  dueDate: Date | null
  details: string
  link: string
  importance: string
  createdDate: Date | null
  createdBy: string
  error: string
}

const initialState: AddTaskState = {
  loading: false,
  title: '',
  dueDate: null,
  details: '',
  link: '',
  importance: '',
  createdDate: null,
  createdBy: '',
  error: '',
}

interface AddTaskPayload {
  title: string
  dueDate: Date
  details: string
  link: string
  importance: string
  createdDate: Date
  createdBy: string
}

export const addTask = createAsyncThunk('addTask', async (payload: AddTaskPayload) => {
  const { title, dueDate, details, link, importance, createdDate, createdBy } = payload
  const response = await axios.post(API_ROOT + '/task/addTask', {
    title,
    dueDate,
    details,
    link,
    importance,
    createdDate,
    createdBy,
  })
  return response.data
})

export const addTaskSlice = createSlice({
  name: 'addTask',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<AddTaskState>) => {
      state.loading = false
      state.title = action.payload.title
      state.dueDate = action.payload.dueDate
      state.details = action.payload.details
      state.link = action.payload.link
      state.importance = action.payload.importance
      state.createdDate = action.payload.createdDate
      state.createdBy = action.payload.createdBy
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false
        state.title = action.payload.title
        state.dueDate = action.payload.dueDate
        state.details = action.payload.details
        state.link = action.payload.link
        state.importance = action.payload.importance
        state.createdDate = action.payload.createdDate
        state.createdBy = action.payload.createdBy
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to add task.'
      })
  },
})

export const { createTask } = addTaskSlice.actions

export default addTaskSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.eventRegistration)`
export const newTask = (state: RootState) => state.addTask
