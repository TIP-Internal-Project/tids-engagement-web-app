import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'



export interface AddEventState {
    loading: boolean;
    eventId: number;
    title: string;
    startDate: Date;
    endDate: Date;
    detail: string;
    category: string;
    createdDate: Date;
    venueDetail: string;
    importance: string;
    code: string;
    googleMeetLink: string;
    starsNum: number;
     postEventSurveyURL: string;
    createdBy: string;
    error: string;
}

const initialState: AddEventState = {
    loading: false,
    eventId: 0,
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    venueDetail: '',
    importance: '',
    code: '',
    googleMeetLink: '',
    starsNum: 0,
    postEventSurveyURL: '',
    createdBy: '',
    detail: '',
    category: '',
    createdDate: new Date(),
    error: '',
}

interface AddEventPayload {
	eventId: number;
    title: string;
    startDate: Date;
    endDate: Date;
    detail: string;
    category: string;
    createdDate: Date;
    venueDetail: string;
    importance: string;
    code: string;
    googleMeetLink: string;
    starsNum: number;
     postEventSurveyURL: string;
    createdBy: string
}



export const addEvent = createAsyncThunk('addEvent', async(payload: AddEventPayload) => {

const {eventId, title, startDate, endDate, detail, category, createdDate, venueDetail, importance, code, googleMeetLink, starsNum, postEventSurveyURL} = payload
const response = await axios.post('http://localhost:3001/events', {eventId, title, startDate, endDate, detail, category, createdDate, venueDetail, importance, code, googleMeetLink, starsNum, postEventSurveyURL})

return response.data

}  )

export const addEventSlice = createSlice({
name: 'addEvent',
initialState,
reducers:{
    createEvent: (state, action: PayloadAction<AddEventState>) => {
        state.loading = false
        state.eventId = action.payload.eventId
        state.title = action.payload.title
        state.startDate = action.payload.startDate
        state.endDate = action.payload.endDate
        state.detail = action.payload.venueDetail
        state.importance = action.payload.importance
        state.code = action.payload.code
        state.googleMeetLink = action.payload.googleMeetLink
        state.starsNum = action.payload.starsNum
        state.postEventSurveyURL = action.payload.postEventSurveyURL
        state.createdBy = action.payload.createdBy
    },
},

extraReducers: (builder) => {
    builder.addCase(addEvent.pending, (state) => {
        state.loading = true
        state.error = ''

    })
    .addCase(addEvent.fulfilled, ( state,action)=> {
        state.loading = false
        state.eventId = action.payload.eventId
        state.title = action.payload.title
        state.startDate = action.payload.startDate
        state.endDate = action.payload.endDate
        state.detail = action.payload.venueDetail
        state.importance = action.payload.importance
        state.code = action.payload.code
        state.googleMeetLink = action.payload.googleMeetLink
        state.starsNum = action.payload.starsNum
        state.postEventSurveyURL = action.payload.postEventSurveyURL
        state.createdBy = action.payload.createdBy
    })
    .addCase(addEvent.rejected, (state,action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to create an event'
    })


}



})








export const {createEvent} = addEventSlice.actions
export default addEventSlice.reducer

export const newEvent = (state: RootState) => state.addEvent