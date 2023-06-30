import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export interface OrderState {
    loading: boolean,
	orders: [],
	error: string
}

const initialState: OrderState = {
	loading: false,
	orders: [],
	error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchOrders = createAsyncThunk('getAllOrders', () => {
	return axios
	  .get('http://localhost:3001/order/getAllOrders')
	  .then(response => response.data)
})

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		storeOrders: (state, action: PayloadAction<[]>) => {
			state.orders = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchOrders.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchOrders.fulfilled, (state, action) => {
			state.loading = false
			state.orders = action.payload
			state.error = ''
		})
		builder.addCase(fetchOrders.rejected, (state, action) => {
			state.loading = false
			state.orders = []
			state.error = action.error.message!
		})
	}
})

export default orderSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getOrders = (state: RootState) => state.order