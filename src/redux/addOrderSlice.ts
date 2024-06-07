import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import api from '../api.json'

const API_ROOT = api.ROOT

export interface AddOrderState {
	loading: boolean;
	workdayId: string;
	name: string;
	orderName: string;
	orderSize: string;
	orderCost: number;
	status: string;
	createdBy: string;
	error: string;
}

const initialState: AddOrderState = {
	loading: false,
	workdayId: '',
	name: '',
	orderName: '',
	orderSize: '',
	orderCost: 0,
	status: '',
	createdBy: '',
	error: '',
}

interface AddOrderPayload {
	workdayId: string;
	name: string;
	orderName: string;
	orderSize: string;
	orderCost: number;
	status: string;
	createdBy: string;
}

export const addOrder = createAsyncThunk('addOrder', async (payload: AddOrderPayload) => {
	const { workdayId, name, orderName, orderSize, orderCost, status, createdBy } = payload
	const response = await axios.post(API_ROOT + '/order/addOrder', { workdayId, name, orderName, orderSize, orderCost, status, createdBy })
	return response.data
})

export const addOrderSlice = createSlice({
  name: 'addOrder',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<AddOrderState>) => {
		state.loading = false
		state.workdayId = action.payload.workdayId
		state.name = action.payload.name
		state.orderName = action.payload.orderName
		state.orderSize = action.payload.orderSize
		state.orderCost = action.payload.orderCost
		state.status = action.payload.status
		state.createdBy = action.payload.createdBy
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false
		state.workdayId = action.payload.workdayId
		state.name = action.payload.name
		state.orderName = action.payload.orderName
		state.orderSize = action.payload.orderSize
		state.orderCost = action.payload.orderCost
		state.status = action.payload.status
		state.createdBy = action.payload.createdBy
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to add order.'
      })
  },
})

export const { createOrder } = addOrderSlice.actions

export default addOrderSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.eventRegistration)`
export const newOrder = (state: RootState) => state.addOrder