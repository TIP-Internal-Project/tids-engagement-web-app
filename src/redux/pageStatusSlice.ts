import { createSlice } from '@reduxjs/toolkit'

import { RootState } from './store'

export interface PageStatusState {
    isLoaded: boolean;
}
const initialState: PageStatusState = {
	isLoaded: true
}

export const pageStatusSlice = createSlice({
	name: 'pageStatus',
	initialState,
	reducers: {
		loaderOn: (state) => {
			state.isLoaded = false
		},
		loaderOff: (state) => {
			state.isLoaded = true
		}
	}
})
export default pageStatusSlice.reducer

export const { loaderOn, loaderOff } = pageStatusSlice.actions
export const getPageStatus = (state: RootState) => state.pageStatus.isLoaded


