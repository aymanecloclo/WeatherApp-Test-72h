import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../../lib/axiosInstance'

interface WeatherState {
    data: any | null
    city: string
    theme: 'default' | 'sunny' | 'rainy' | 'snowy' | 'cloudy'
    loading: boolean
    error: string | null
}

const initialState: WeatherState = {
    data: null,
    city: 'Paris',
    theme: 'default',
    loading: false,
    error: null
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setWeatherData: (state, action: PayloadAction<any>) => {
            state.data = action.payload
            state.loading = false
            state.error = null

            const weatherMain = action.payload.weather.weather[0]?.main?.toLowerCase() || ''
            state.theme =
                weatherMain.includes('sun') ? 'sunny' :
                    weatherMain.includes('rain') ? 'rainy' :
                        weatherMain.includes('snow') ? 'snowy' :
                            weatherMain.includes('cloud') ? 'cloudy' : 'default'
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const { setCity, setLoading, setWeatherData, setError } = weatherSlice.actions

export const fetchWeather = (city: string) => async (dispatch: any) => {
    dispatch(setLoading(true))
    try {
        const res = await axiosInstance.get(`/weather?city=${city}`)
        dispatch(setWeatherData(res.data))
        dispatch(setCity(city))
    } catch (err) {
        dispatch(setError('Erreur lors de la récupération des données météo'))
    }
}

export default weatherSlice.reducer