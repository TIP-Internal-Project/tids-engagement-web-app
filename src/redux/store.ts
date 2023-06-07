import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import pageStatusReducer from './pageStatusSlice'
import userSessionReducer from './userSessionSlice'
import eventsReducer from './eventSlice'
import overviewEventsReducer from './overviewEventsSlice'

export const store = configureStore({
  	reducer: {
    	pageStatus: pageStatusReducer,
		userSession: userSessionReducer,
		events: eventsReducer,
		overviewEvents: overviewEventsReducer,
  	},
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
