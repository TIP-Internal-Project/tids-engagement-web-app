import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './store'

export interface UserSessionState {
    accessToken: string,
    idToken: string,
    state: string,
    nonce: string,
    email: string,
    familyName: string,
    givenName: string,
    name: string,
    preferredUsername: string,
    role: string,
    workdayId: string
}

const initialState: UserSessionState = {
	accessToken: '',
	idToken: '',
	state: '',
	nonce: '',
	email: '',
	familyName: '',
	givenName: '',
	name: '',
	preferredUsername: '',
	role: '',
	workdayId: '',
}

export const userSessionSlice = createSlice({
	name: 'userSession',
	initialState,
	reducers: {
		storeAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload
		},
		storeIdToken: (state, action: PayloadAction<string>) => {
			state.idToken = action.payload
		},
		storeState: (state, action: PayloadAction<string>) => {
			state.state = action.payload
		},
		storeNonce: (state, action: PayloadAction<string>) => {
			state.nonce = action.payload
		},
		storeEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		},
		storeFamilyName: (state, action: PayloadAction<string>) => {
			state.familyName = action.payload
		},
		storeGivenName: (state, action: PayloadAction<string>) => {
			state.givenName = action.payload
		},
		storeName: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		},
		storePreferredUsername: (state, action: PayloadAction<string>) => {
			state.preferredUsername = action.payload
		},
		storeRole: (state, action: PayloadAction<string>) => {
			state.role = action.payload
		},
		storeWorkdayId: (state, action: PayloadAction<string>) => {
			state.workdayId = action.payload
		},
		logOff: () => initialState,
	},
})
export default userSessionSlice.reducer

export const {
	storeAccessToken,
	storeIdToken,
	storeState,
	storeNonce,
	storeEmail,
	storeFamilyName,
	storeGivenName,
	storeName,
	storePreferredUsername,
	storeRole,
	storeWorkdayId,
	logOff,
} = userSessionSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getUserSession = (state: RootState) => state.userSession
export const getAccessToken = (state: RootState) => state.userSession.accessToken

