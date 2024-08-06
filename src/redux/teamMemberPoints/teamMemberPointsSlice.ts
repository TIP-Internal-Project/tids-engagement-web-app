import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

const API_ROOT = process.env.REACT_APP_API_URL

export interface TeamMemberPointsState {
  loading: boolean
  teamMemberPoints: []
  error: string
}

const initialState: TeamMemberPointsState = {
  loading: false,
  teamMemberPoints: [],
  error: '',
}

// Generates pending, fulfilled and rejected action types
export const fetchTeamMemberPoints = createAsyncThunk(
  'getTeamMemberPointsByEmail',
  async (email: string) => {
    return axios
      .get(`${API_ROOT}/teamMemberPoints/getTeamMemberPointsByEmail/${email}`)
      .then((response) => response.data)
  }
)

export const teamMemberPointsSlice = createSlice({
  name: 'teamMemberPoints',
  initialState,
  reducers: {
    storeTeamMemberPoints: (state, action: PayloadAction<[]>) => {
      state.teamMemberPoints = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeamMemberPoints.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTeamMemberPoints.fulfilled, (state, action) => {
      state.loading = false
      state.teamMemberPoints = action.payload
      state.error = ''
    })
    builder.addCase(fetchTeamMemberPoints.rejected, (state, action) => {
      state.loading = false
      state.teamMemberPoints = []
      state.error = action.error.message!
    })
  },
})

export default teamMemberPointsSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getTeamMemberPoints = (state: RootState) => state.teamMemberPoints
