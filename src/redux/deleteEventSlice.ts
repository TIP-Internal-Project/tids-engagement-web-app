import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

const API_ROOT = process.env.REACT_APP_API_URL

export interface DeleteEventState {
  loading: boolean
  eventId: number
  status: string
  updatedBy: string
  updatedAt: Date | null
  error: string
}

const initialState: DeleteEventState = {
  loading: false,
  eventId: 0,
  status: '',
  updatedBy: '',
  updatedAt: null,
  error: '',
}

interface DeleteEventPayload {
  eventId: number
  status: string
  updatedBy: string
  updatedAt: Date
}

export const deleteEvent = createAsyncThunk('deleteEvent', async (payload: DeleteEventPayload) => {
  const { eventId, status, updatedBy, updatedAt } = payload
  const response = await axios.put(`${API_ROOT}/events/deleteEvent/${eventId}`, {
    eventId,
    status,
    updatedBy,
    updatedAt,
  })
  return response.data
})

export const deleteEventSlice = createSlice({
  name: 'deleteEvent',
  initialState,
  reducers: {
    removeEvent: (state, action: PayloadAction<DeleteEventState>) => {
      state.loading = false
      state.eventId = action.payload.eventId
      state.status = action.payload.status
      state.updatedBy = action.payload.updatedBy
      state.updatedAt = action.payload.updatedAt
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false
        state.eventId = action.payload.orderId
        state.status = action.payload.status
        state.updatedBy = action.payload.updatedBy
        state.updatedAt = action.payload.updatedAt
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete event.'
      })
  },
})

export const { removeEvent } = deleteEventSlice.actions

export default deleteEventSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.eventRegistration)`
export const deletedEvent = (state: RootState) => state.deleteEvent
