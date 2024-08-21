import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface eventsData {
    firstimage: string | null;
    title: string;
    areaCode: string;
    contentid: string;
    addr1: string;
    contenttypeid: string;
    eventstartdate: string;
    eventenddate: string;
    eventplace: string;
    playtime: string;
    sponsor1: string;
}

interface eventsState {
    events: eventsData[];
    loading: boolean;
    error: string | null;
}

const initialState: eventsState = {
    events: [],
    loading: false,
    error: null,
};

export const fetchEventsByArea = createAsyncThunk('events/fetchEventsByArea', 
    async ({areaCode, date} : { areaCode: string; date: string }, { getState }) => {
    try {
        const state = getState() as RootState;
        const eventapiKey = process.env.NEXT_PUBLIC_TOUR_APP_API_KEY;
        const selectedDate = state.date.selectedDate || new Date().toISOString().slice(0, 10).replace(/-/g, '');
        let url = `http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${eventapiKey}&MobileOS=ETC&MobileApp=AppTest&arrange=D&numOfRows=20&_type=json&eventStartDate=${selectedDate}`;

        if (areaCode && areaCode !== '') {
            url += `&areaCode=${areaCode}`;
        }

        const response = await axios.get(url);
        const data = response.data;

        if (data && data.response && data.response.body && data.response.body.items) {
            const events = data.response.body.items.item as eventsData[];
            return events;
        } else {
            console.error('Unexpected API response structure:', data);
            throw new Error('Failed to fetch data: Invalid structure');
        }
    } catch (error) {
        console.error('Error fetching tour data:', error);
        throw error;
    }
});

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventsByArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventsByArea.fulfilled, (state, action) => {
                state.events = action.payload;
                state.loading = false;
            })
            .addCase(fetchEventsByArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch events';
            });
    },
});

export default eventSlice.reducer;
