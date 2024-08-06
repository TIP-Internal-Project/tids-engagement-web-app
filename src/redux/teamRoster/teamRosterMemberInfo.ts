import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

const API_ROOT = process.env.REACT_APP_API_URL

export interface TeamMemberState {
  loading: boolean
  userDetails: {
    workorderId: number
    employeeName: string
    jobProfile: string
    immediateManager: string
    immediateManagerWorkorderId: number
    site: string
    hireDate: string
    yearsOfService: number
    workEmailAddress: string
    employeeType: string
    tidsPractice: string
  } | null
  userRole: string
  error: string
}

const initialState: TeamMemberState = {
  loading: false,
  userDetails: null,
  userRole: '',
  error: '',
}

export const fetchTeamMemberInfo = createAsyncThunk(
  'teamMemberInfo/getTeamMemberInfoByEmail',
  async (email: string) => {
    try {
      const response = await axios.get(`${API_ROOT}/teamRoster/getTeamMemberInfoByEmail/${email}`)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch team member info')
    }
  }
)

// Function to determine user role based on job profile
const getUserRole = (jobProfile: string) => {
  return jobProfile === 'General Administration Analyst' ||
    jobProfile.includes('Leader') ||
    jobProfile.includes('Manager')
    ? 'Admin'
    : 'Teammember'
}

export const teamMemberSlice = createSlice({
  name: 'teamMemberInfo',
  initialState,
  reducers: {
    setUserRole: (state) => {
      if (state.userDetails) {
        state.userRole = getUserRole(state.userDetails.jobProfile)
        sessionStorage.setItem('userRole', state.userRole)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeamMemberInfo.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchTeamMemberInfo.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      if (action.payload) {
        state.userDetails = action.payload
        state.userRole = getUserRole(action.payload.jobProfile)
        sessionStorage.setItem('userRole', state.userRole)
      } else {
        state.userDetails = null
        state.error = 'No user details found'
      }
    })
    builder.addCase(fetchTeamMemberInfo.rejected, (state, action) => {
      state.loading = false
      state.userDetails = null
      state.error = action.error.message ? action.error.message : 'Failed to fetch user details'
    })
  },
})

export default teamMemberSlice.reducer

// Selectors to access state slices
export const selectUserDetails = (state: RootState) => state.teamMemberInfo.userDetails
export const selectUserRole = (state: RootState) => state.teamMemberInfo.userRole
export const selectLoading = (state: RootState) => state.teamMemberInfo.loading
export const selectError = (state: RootState) => state.teamMemberInfo.error
