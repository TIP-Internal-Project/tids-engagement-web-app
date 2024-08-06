import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

const API_ROOT = process.env.REACT_APP_API_URL

export interface AddPointsState {
  loading: boolean
  email: string
  pointsToAdd: number
  category: string
  error: string
}

const initialState: AddPointsState = {
  loading: false,
  email: '',
  pointsToAdd: 0,
  category: '',
  error: '',
}

interface AddStarPointsPayload {
  email: string
  pointsToAdd: number
  category: string
}

export const addPoints = createAsyncThunk('addPoints', async (payload: AddStarPointsPayload) => {
  const { email, pointsToAdd, category } = payload
  const response = await axios.post(API_ROOT + '/teamMemberPoints/addPoints', {
    email,
    pointsToAdd,
    category,
  })
  return response.data
})

export const addPointsSlice = createSlice({
  name: 'addPoints',
  initialState,
  reducers: {
    addTeamMemberPoints: (state, action: PayloadAction<AddPointsState>) => {
      state.loading = false
      state.email = action.payload.email
      state.pointsToAdd = action.payload.pointsToAdd
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPoints.pending, (state) => {
      state.loading = true
    })
    builder.addCase(addPoints.fulfilled, (state, action) => {
      state.loading = false
      state.email = action.payload.email
      state.pointsToAdd = action.payload.pointsToAdd
    })
    builder.addCase(addPoints.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message!
    })
  },
})

export const { addTeamMemberPoints } = addPointsSlice.actions

export default addPointsSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const starPoints = (state: RootState) => state.addPoints
