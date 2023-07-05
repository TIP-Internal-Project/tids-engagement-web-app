import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export interface UpdateOrderState {
	loading: boolean;
	orderId: number;
	workdayId: string;
	name: string;
	orderName: string;
	orderSize: string;
	orderCost: number;
	status: string;
	updatedBy: string;
	updatedAt: Date | null;
	error: string;
}

const initialState: UpdateOrderState = {
	loading: false,
	orderId: 0,
	workdayId: '',
	name: '',
	orderName: '',
	orderSize: '',
	orderCost: 0,
	status: '',
	updatedBy: '',
	updatedAt: null,
	error: '',
}

interface UpdateOrderPayload {
	orderId: number;
	workdayId: string;
	name: string;
	orderName: string;
	orderSize: string;
	orderCost: number;
	status: string;
	updatedBy: string;
	updatedAt: Date;
}

export const updateOrder = createAsyncThunk('updateOrder', async (payload: UpdateOrderPayload) => {
	const { orderId, workdayId, name, orderName, orderSize, orderCost, status, updatedBy, updatedAt } = payload
	const response = await axios.put(`http://localhost:3001/order/updateOrderById/${orderId}`, { workdayId, name, orderName, orderSize, orderCost, status, updatedBy, updatedAt })
	return response.data
})

export const updateOrderSlice = createSlice({
  name: 'updateOrder',
  initialState,
  reducers: {
    editOrder: (state, action: PayloadAction<UpdateOrderState>) => {
		state.loading = false
		state.orderId = action.payload.orderId
		state.workdayId = action.payload.workdayId
		state.name = action.payload.name
		state.orderName = action.payload.orderName
		state.orderSize = action.payload.orderSize
		state.orderCost = action.payload.orderCost
		state.status = action.payload.status
		state.updatedBy = action.payload.updatedBy
		state.updatedAt = action.payload.updatedAt
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false
		state.orderId = action.payload.orderId
		state.workdayId = action.payload.workdayId
		state.name = action.payload.name
		state.orderName = action.payload.orderName
		state.orderSize = action.payload.orderSize
		state.orderCost = action.payload.orderCost
		state.status = action.payload.status
		state.updatedBy = action.payload.updatedBy
		state.updatedAt = action.payload.updatedAt
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to update order.'
      })
  },
})

export const { editOrder } = updateOrderSlice.actions

export default updateOrderSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.eventRegistration)`
export const updatedOrder = (state: RootState) => state.updateOrder