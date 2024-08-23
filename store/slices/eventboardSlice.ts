import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface EventsData {
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

interface EventsState {
    events: EventsData[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
}

const initialState: EventsState = {
    events: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
};

// 특정 지역, 특정 월에 진행하는 행사 정보 가져오기
export const fetchEventsByAreaAndMonth = createAsyncThunk(
    'events/fetchEventsByAreaAndMonth',
    async ({ areaCode, eventMonth, page }: { areaCode: string; eventMonth: string; page: number }) => {
        try {
            const eventApiKey = process.env.NEXT_PUBLIC_TOUR_APP_API_KEY;
            const formattedMonth = dayjs(eventMonth).format('YYYYMM');
            const numOfRows = 21;

            let url = `http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${eventApiKey}&MobileOS=ETC&MobileApp=AppTest&arrange=D&numOfRows=${numOfRows}&pageNo=${page}&_type=json&eventStartDate=${formattedMonth}01&eventEndDate=${formattedMonth}31`;

            if (areaCode) {
                url += `&areaCode=${areaCode}`;
            }

            console.log('API URL:', url);

            const response = await axios.get(url);
            console.log('API Response:', response.data); 

            const data = response.data;

            if (data && data.response && data.response.body && data.response.body.items && data.response.body.items.item) {
                const events = data.response.body.items.item as EventsData[];
                const totalItems = data.response.body.totalCount;
                const totalPages = Math.ceil(totalItems / numOfRows);
                return { events, totalPages };
            } else {
                console.error('Unexpected API response structure: ', data);
                throw new Error('Failed to fetch data: Invalid structure');
            }
        } catch (error) {
            console.error('Error fetching tour data: ', error);
            throw error;
        }
    }
);

const eventboardSlice = createSlice({
    name: 'eventboard',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventsByAreaAndMonth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventsByAreaAndMonth.fulfilled, (state, action) => {
                state.events = action.payload.events;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(fetchEventsByAreaAndMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch events';
            });
    },
});

export default eventboardSlice.reducer;
