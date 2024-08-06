import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

const API_ROOT = process.env.REACT_APP_API_URL

export interface TeamMemberInfoState {
  loading: boolean
  teamMemberInfo: []
  error: string
}

const initialState: TeamMemberInfoState = {
  loading: false,
  teamMemberInfo: [],
  error: '',
}

export const fetchTeamMemberInfo = createAsyncThunk('getTeamMemberInfoByName', async (name: string) => {
  return axios
    .get(`${API_ROOT}/teamMember/getTeamMemberInfoByName/${name}`)
    .then((response) => response.data)
})

export const teamMemberInfoSlice = createSlice({
  name: 'teamMemberInfo',
  initialState,
  reducers: {
    storeTeamMemberInfo: (state, action: PayloadAction<[]>) => {
      state.teamMemberInfo = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeamMemberInfo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTeamMemberInfo.fulfilled, (state, action) => {
      state.loading = false
      state.teamMemberInfo = action.payload
      state.error = ''
    })
    builder.addCase(fetchTeamMemberInfo.rejected, (state, action) => {
      state.loading = false
      state.teamMemberInfo = []
      state.error = action.error.message!
    })
  },
})

export default teamMemberInfoSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getTeamMemberInfoByName = (state: RootState) => state.teamMemberInfo
