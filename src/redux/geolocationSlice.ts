import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface GeolocationData {
  latitude: number;
  longitude: number;
  address: string;
}

export const fetchGeolocation = createAsyncThunk('geolocation/fetchGeolocation', async () => {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    if (!isGeolocationPosition(position)) {
      throw new Error('Geolocation position or coordinates not available.')
    }

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    const apiKey = '901fb11de243444f8ceeaaa9a7597d7b'
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
    const data = await response.json()

    const address = data.results[0]?.formatted || 'Unknown Address'
    console.log(address)

    return address
})

// Geolocation slice
const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState: { data: null as GeolocationData | null, loading: 'idle', error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeolocation.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchGeolocation.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchGeolocation.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message || 'An error occurred'
      })
  },
})

// Export the selector and the reducer
export const selectGeolocation = (state: any) => state.geolocation
export default geolocationSlice.reducer

// Type guard for GeolocationPosition
function isGeolocationPosition(obj: any): obj is GeolocationPosition {
  return (
    obj &&
    typeof obj === 'object' &&
    'coords' in obj &&
    'latitude' in obj.coords &&
    'longitude' in obj.coords
  )
}