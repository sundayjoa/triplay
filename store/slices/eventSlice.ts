import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

interface eventsData {
    firstimage: string;
    title: string;
    areaCode: string;
    contentid: string;
    addr1: string;
    contenttypeid: string;
}

//상세 축제/공연 정보
interface EventDetailData {
    eventstartdate: string;
    eventenddate: string;
    playtime: string;
    contentid: string;
    contenttypeid: string;
}

interface eventsState {
    events: eventsData[];
    eventDetails: EventDetailData[];
    loading: boolean;
    error: string | null;
}

const initialState: eventsState = {
    events: [],
    eventDetails: [],
    loading: false,
    error: null,
};

// 특정 지역의 축제/공연 데이터를 가져오기
export const fetchEventsByArea = createAsyncThunk('events/fetchEventsByArea', async (areaCode: string) => {
    try {
        const eventapiKey = process.env.NEXT_PUBLIC_TOUR_APP_API_KEY;

        let url = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${eventapiKey}&MobileOS=ETC&MobileApp=AppTest&contentTypeId=15&arrange=Q&_type=json`;

        if (areaCode) {
            url += `&areaCode=${areaCode}`;
        }

        const response = await axios.get(url);

        const data = response.data;

        // 응답 데이터가 유효한지 확인 후 반환
        if (data && data.response && data.response.body && data.response.body.items) {
            return data.response.body.items.item as eventsData[];
        } else {
            console.error('Unexpected API response structure:', data);
            throw new Error('Failed to fetch data: Invalid structure');
        }
    } catch (error) {
        console.error('Error fetching tour data:', error);
        throw error;
    }
});

// contentid를 이용해 이벤트 세부 정보를 가져오기
export const fetchEventDetails = async (contentid: string): Promise<EventDetailData | null> => {
    try {
        console.log("Fetching details for contentid:", contentid);

        const eventapiKey = process.env.NEXT_PUBLIC_TOUR_APP_API_KEY;
        const url = `http://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${eventapiKey}&MobileOS=ETC&MobileApp=AppTest&contentTypeId=15&_type=json&contentId=${contentid}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data && data.response && data.response.body && data.response.body.items && data.response.body.items.item.length > 0) {
            const item = data.response.body.items.item[0];
            return {
                eventstartdate: item.eventstartdate,
                eventenddate: item.eventenddate,
                playtime: item.playtime || '',
                contentid: item.contentid,
                contenttypeid: item.contenttypeid,
            };
        } else {
            throw new Error('Failed to fetch data: Invalid structure');
        }
    } catch (error) {
        console.error('Error fetching event details:', error);
        return null;
    }
};



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