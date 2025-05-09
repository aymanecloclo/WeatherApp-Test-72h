import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axiosInstance';

// Types
interface WeatherResponse {
    city: string;
    weather: {
        main: {
            temp: number;
            humidity: number;
            pressure: number;
        };
        weather: Array<{
            main: string;
            description: string;
        }>;
        wind: {
            speed: number;
        };
    };
    pollution?: {
        main: {
            aqi: number;
        };
        components: Record<string, number>;
    };
    coord?: {
        lat: number;
        lon: number;
    };
    timestamp?: number;
}

type WeatherTheme = 'default' | 'sunny' | 'rainy' | 'snowy' | 'cloudy';

interface WeatherState {
    data: WeatherResponse | null;
    city: string;
    theme: WeatherTheme;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    city: '',
    theme: 'default',
    loading: false,
    error: null,
};

// Async action with proper error handling
export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<WeatherResponse>(`/weather?city=${city}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Failed to fetch weather data'
            );
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        resetWeather: () => initialState,
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.city = action.payload.city;

                const weatherMain = action.payload.weather.weather[0]?.main?.toLowerCase() || '';
                state.theme =
                    weatherMain.includes('sun') ? 'sunny' :
                        weatherMain.includes('rain') ? 'rainy' :
                            weatherMain.includes('snow') ? 'snowy' :
                                weatherMain.includes('cloud') ? 'cloudy' : 'default';
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Unknown error occurred';
            });
    },
});

export const { resetWeather, setCity } = weatherSlice.actions;
export default weatherSlice.reducer;