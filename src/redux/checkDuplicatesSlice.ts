import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

const API_ROOT = process.env.REACT_APP_API_URL

export interface CheckDuplicatesState {
  loading: boolean
  // employeeName: string;
  email: string
  eventId: number
  error: string
}

const initialState: CheckDuplicatesState = {
  loading: false,
  // employeeName: '',
  email: '',
  eventId: 0,
  error: '',
}

interface CheckDuplicatesPayload {
  // employeeName: string;
  email: string
  eventId: number
}

export const checkDuplicates = createAsyncThunk(
  'checkDuplicates',
  async (payload: CheckDuplicatesPayload) => {
    const { email, eventId } = payload
    const response = await axios.get(API_ROOT + `/teamMember/CheckDuplicates/${email}/${eventId}`)
    return response.data
  }
)

export const checkDuplicatesSlice = createSlice({
  name: 'checkDuplicates',
  initialState,
  reducers: {
    checkDupes: (state, action: PayloadAction<CheckDuplicatesState>) => {
      state.loading = false
      state.email = action.payload.email
      state.eventId = action.payload.eventId
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkDuplicates.pending, (state) => {
      state.loading = true
    })
    builder.addCase(checkDuplicates.fulfilled, (state, action) => {
      state.loading = false
      state.email = action.payload.email
      state.eventId = action.payload.eventId
    })
    builder.addCase(checkDuplicates.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message!
    })
  },
})

export const { checkDupes } = checkDuplicatesSlice.actions

export default checkDuplicatesSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const starPoints = (state: RootState) => state.checkDuplicates
