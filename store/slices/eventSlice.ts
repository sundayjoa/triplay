import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

interface eventsData {
    firstimage: string;
    title: string;
    areaCode: string;
    contentid: string;
    addr1: string;
    contenttypeid: string;
    eventstartdate: string;
    eventenddate: string;
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

//특정 지역의 축제/공연 데이터 가져오기
export const fetchEventsByArea = createAsyncThunk(
    'events/fetchEventsByArea',
    async (areaCode: string) => {
        const eventapiKey = process.env.NEXT_PUBLIC_TOUR_APP_API_KEY;
        let url = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${eventapiKey}&MobileOS=ETC&MobileApp=AppTest&contentTypeId=15&arrange=Q&_type=json`;

        // areaCode가 빈 문자열이 아닌 경우에만 areaCode 파라미터를 추가
        if (areaCode && areaCode !== '') {
            url += `&areaCode=${areaCode}`;
        }

        const response = await axios.get(url);
        return response.data.response.body.items.item as eventsData[];
    }
);

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
                state.error = action.error.message || 'Failed to fetch tours';
            });
    },
});

export default eventSlice.reducer;