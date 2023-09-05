import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

export interface AddEventState {
  loading: boolean
  eventId: number
  title: string
  startDate: Date
  endDate: Date
  detail: string
  category: string
  eventType: string
  createdDate: Date
  venueDetail: string
  importance: string
  code: string
  googleMeetLink: string
  starsNum: number
  postEventSurveyURL: string
  createdBy: string
  error: string
  qrCodeUrl: string
  imageUrl: string
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
  eventType: '',
  createdDate: new Date(),
  error: '',
  qrCodeUrl: '',
  imageUrl: ''
}

interface AddEventPayload {
  eventId: number
  title: string
  venueDetails: string
  eventDetails: string
  startDate: string
  endDate: string
  code: string
  category: string
  eventType: string
  importance: string
  gmeetLink: string
  postEventSurveyURL: string
  starsNum: number
  regLink: string
  createdDate: Date
  createdBy: string
  qrCodeUrl: string
  imageFile: File
  imageUrl: string
}

export const addEvent = createAsyncThunk('addEvent', async (payload: AddEventPayload) => {
  const {
    eventId,
    title,
    venueDetails,
    eventDetails,
    startDate,
    endDate,
    code,
    category,
    eventType,
    importance,
    gmeetLink,
    postEventSurveyURL,
    starsNum,
    regLink,
    qrCodeUrl,
    imageFile,
    imageUrl
  
  } = payload
  
  

  const formData = new FormData()
  formData.append('eventId', eventId.toString())
  formData.append('title', title)
  formData.append('venueDetails', venueDetails)
  formData.append('eventDetails', eventDetails)
  formData.append('startDate', startDate)
  formData.append('endDate', endDate)
  formData.append('code', code)
  formData.append('category', category)
  formData.append('importance', importance)
  formData.append('gmeetLink', gmeetLink)
  formData.append('postEventSurveyURL', postEventSurveyURL)
  formData.append('starsNum', starsNum.toString())
  formData.append('regLink', regLink)
  formData.append('qrCodeUrl', qrCodeUrl)
  formData.append('imgfile', imageFile)
  formData.append('imageUrl', imageUrl)
  formData.append('eventType', eventType)

  try {
    // Upload the image and create the event using axios
    const response = await axios.post('http://localhost:3001/createEvent', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file upload
      },
    })

    return response.data
  } catch (error) {
    throw new Error('Failed to create an event')
  }
})

export const addEventSlice = createSlice({
  name: 'addEvent',
  initialState,
  reducers: {
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
      state.qrCodeUrl = action.payload.qrCodeUrl
      state.imageUrl = action.payload.imageUrl
      state.eventType = action.payload.eventType
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addEvent.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(addEvent.fulfilled, (state, action) => {
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
        state.qrCodeUrl = action.payload.qrCodeUrl
        state.eventType = action.payload.eventType
        state.imageUrl = action.payload.imageUrl
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to create an event'
      })
  },
})

export const { createEvent } = addEventSlice.actions
export default addEventSlice.reducer

export const newEvent = (state: RootState) => state.addEvent
