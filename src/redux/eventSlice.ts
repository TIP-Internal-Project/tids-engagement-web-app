import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type Event = {
  eventId: number
  title: string
  venueDetails: string
  eventDetails: string
  startDate: Date
  endDate: Date
  code: string
  category: string
  eventType: string
  importance: string
  gmeetLink: string
  postSurveyLink: string
  starsNum: number
  regLink: string
  imageFile: File
  imageUrl: string
  
}

type InitialState = {
  loading: boolean
  events: Event[]
  error: string
  userName: string
}

const initialState: InitialState = {
  loading: false,
  events: [],
  error: '',
  userName: '',
}

export const fetchEvents = createAsyncThunk('fetchEvents', () => {
  return axios.get('http://localhost:3001/events').then((response) => response.data)
})

export const updateEvent = createAsyncThunk('updateEvent', async (event: any) => {
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
    postSurveyLink,
    starsNum,
    regLink,
    imageFile,
    imageUrl
  } = event

  
  const formData = new FormData()

  
  if (title) formData.append('title', title)
  if (venueDetails) formData.append('venueDetails', venueDetails)
  if (eventDetails) formData.append('eventDetails', eventDetails)
  if (startDate) formData.append('startDate', startDate)
  if (endDate) formData.append('endDate', endDate)
  if (code) formData.append('code', code)
  if (category) formData.append('category', category)
  if (eventType) formData.append('eventType', eventType)
  if (importance) formData.append('importance', importance)
  if (gmeetLink) formData.append('gmeetLink', gmeetLink)
  if (postSurveyLink) formData.append('postSurveyLink', postSurveyLink)
  if (starsNum) formData.append('starsNum', starsNum)
  if (regLink) formData.append('regLink', regLink)
  if (regLink) formData.append('regLink', regLink)

  
   if (imageFile) {
    formData.append('imageFile', imageFile)
  }

 
  if (imageUrl) {
    formData.append('imageUrl', imageUrl)
  }

  return axios
    .patch(`http://localhost:3001/events/updateEvent/${eventId}`, formData)
    .then((response) => response.data)
})

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
      state.loading = false
      state.events = action.payload
      state.error = ''
    })
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading = false
      state.events = []
      state.error = action.error.message || 'Something went wrong'
    })
  },
})

export default eventSlice.reducer
