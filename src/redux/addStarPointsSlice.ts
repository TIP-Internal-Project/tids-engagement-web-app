import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export interface AddStarPointsState {
    loading: boolean;
	employeeName: string;
	pointsToAdd: number;
	error: string;
}

const initialState: AddStarPointsState = {
	loading: false,
	employeeName: '',
    pointsToAdd: 0,
	error: '',
}

interface AddStarPointsPayload {
	employeeName: string;
	pointsToAdd: number;
}

export const addStarPoints = createAsyncThunk('addStarPoints', async (payload: AddStarPointsPayload) => {
    const { employeeName, pointsToAdd } = payload
    const response = await axios.post('http://localhost:3001/teamMember/addStarPoints', { employeeName, pointsToAdd })
    return response.data
})

export const addStarPointsSlice = createSlice({
	name: 'addStarPoints',
	initialState,
	reducers: {
		addPoints: (state, action: PayloadAction<AddStarPointsState>) => {
            state.loading = false
            state.employeeName = action.payload.employeeName
            state.pointsToAdd = action.payload.pointsToAdd
        },
	},
	extraReducers: builder => {
		builder.addCase(addStarPoints.pending, state => {
			state.loading = true
		})
		builder.addCase(addStarPoints.fulfilled, (state, action) => {
			state.loading = false
			state.employeeName = action.payload.employeeName
            state.pointsToAdd = action.payload.pointsToAdd
		})
		builder.addCase(addStarPoints.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message!
		})
	}
})

export const { addPoints } = addStarPointsSlice.actions

export default addStarPointsSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const starPoints = (state: RootState) => state.addStarPoints