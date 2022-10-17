import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import pageStatusReducer from './pageStatusSlice'
import userSessionReducer from './userSessionSlice'

export const store = configureStore({
	reducer: {
		pageStatus: pageStatusReducer,
		userSession: userSessionReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
