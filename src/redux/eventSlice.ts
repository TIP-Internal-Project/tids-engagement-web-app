import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../api.json'

const API_ROOT = api.ROOT

type Event = {
  eventId: number
  title: string
  venueDetails: string
  eventDetails: string
  startDate: Date
  endDate: Date
  updatedAt: Date | null;
  code: string
  category: string
  eventType: string
  importance: string
  gmeetLink: string
  postEventSurveyURL: string
  estimatedBudget: number
  numberOfInviteSent: number
  starsNum: number
  regLink: string
  imageFile: File
  imageUrl: string
  status: string
  attendees:number
  targetCompliance:number
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
  return axios.get(API_ROOT + '/events/getAllEvents').then((response) => response.data)
})

export const getAllEvents = createAsyncThunk('getAllEvents', async () => {
  const response = await axios.get(API_ROOT + '/events/getAllEvents')
  return response.data
})

export const getEventDetailsByDate = createAsyncThunk('getEventDetailsByDate', async (startDate: string) => {
	const response = await axios.post(API_ROOT + '/events/getEventDetailsByDate', { startDate })
	return response.data
})

export const updateEvent = createAsyncThunk('updateEvent', async (event: any) => {
  const {
    eventId,
    title,
    venueDetails,
    eventDetails,
    startDate,
    endDate,
    attendees,
    targetCompliance,
    code,
    category,
    eventType,
    importance,
    gmeetLink,
    postEventSurveyURL,
    estimatedBudget,
    numberOfInviteSent,
    starsNum,
    regLink,
    imageFile,
    imageUrl,
    status
  } = event

 
  function addZero(number: number) {
    return number < 10 ? '0' + number.toString() : number
  }

  const newEventDate = new Date()
  const utcOffset = -8 * 60
  const localTime = new Date(newEventDate.getTime() + (utcOffset * 60000))
  
  const year = localTime.getFullYear()
  const month = addZero(localTime.getMonth() + 1)
  const date = addZero(localTime.getDate())
  const hour = addZero(localTime.getHours())
  const minute = addZero(localTime.getMinutes())
  
  const updatedAt = `${year}-${month}-${date} ${hour}:${minute}`
  const formData = new FormData()
  
  if (title) formData.append('title', title)
  if (venueDetails) formData.append('venueDetails', venueDetails)
  if (eventDetails) formData.append('eventDetails', eventDetails)
  if (startDate) formData.append('startDate', startDate)
  if (endDate) formData.append('endDate', endDate)
  formData.append('updatedAt', updatedAt)
  if (code) formData.append('code', code)
  if (category) formData.append('category', category)
  if (eventType) formData.append('eventType', eventType)
  if (importance) formData.append('importance', importance)
  formData.append('gmeetLink', gmeetLink)
  formData.append('postEventSurveyURL', postEventSurveyURL)
  formData.append('estimatedBudget', estimatedBudget)
  formData.append('numberOfInviteSent', numberOfInviteSent)
  if (starsNum) formData.append('starsNum', starsNum)
  if (regLink) formData.append('regLink', regLink)
  if (status) formData.append('status', status)
  if (targetCompliance) formData.append('targetCompliance', targetCompliance)

  
   if (imageFile) {
    formData.append('imageFile', imageFile)
  }

 
  if (imageUrl) {
    formData.append('imageUrl', imageUrl)
  }

  return axios
    .patch(`${API_ROOT}/events/updateEvent/${eventId}`, formData)
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
