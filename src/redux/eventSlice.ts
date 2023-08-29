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
  } = event
  return axios
    .patch(`http://localhost:3001/events/updateEvent/${eventId}`, {
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
    })
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
