import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type Event = {
  eventId: string;
  title: string;
  startDate?: Date;
  endDate?: Date;
  startTime?: Date;
  detail: string;
  category: string;
  createdDate: Date;
  venueDetail: string;
  importance: string;
  code: string;
  googleMeetLink: string;
  starsNum: number;
  postEventSurveyURL: string;

};

type InitialState = {
  loading: boolean;
  events: Event[];
  error: string;
  userName: string;
};

const initialState: InitialState = {
  loading: false,
  events: [],
  error: '',
  userName: '',
}

export const fetchEvents = createAsyncThunk('fetchEvents', () => {
  return axios.post('http://localhost:3001/events').then((response) => response.data)
})

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false
        state.events = action.payload
        state.error = ''
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.events = []
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export const { addEvent } = eventSlice.actions

export default eventSlice.reducer
