import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 관광지 데이터 타입 정의
interface TourData {
    firstimage: string;
    title: string;
    addr1: string;
    contentid: string;
    contenttypeid: string;
}

// 슬라이스 상태 타입 정의
interface TourState {
    tours: TourData[];
    loading: boolean;
    error: string | null;
}

const initialState: TourState = {
    tours: [],
    loading: false,
    error: null,
};

// API를 이용해 관광지 데이터를 가져오기
export const fetchTours = createAsyncThunk('tour/fetchTours', async () => {
    try {
        const tourapiKey = process.env.NEXT_PUBLIC_TOUR_APP_API_KEY;

        const response = await axios.get(`http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${tourapiKey}&MobileOS=ETC&MobileApp=AppTest&contentTypeId=15&arrange=Q&_type=json&numOfRows=5`);


        const data = response.data;

        // 응답 데이터가 유효한지 확인 후 반환
        if (data && data.response && data.response.body && data.response.body.items) {
            return data.response.body.items.item as TourData[];
        } else {
            console.error('Unexpected API response structure:', data);
            throw new Error('Failed to fetch data: Invalid structure');
        }
    } catch (error) {
        console.error('Error fetching tour data:', error);
        throw error;
    }
});

// Redux Slice 생성
const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTours.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTours.fulfilled, (state, action) => {
                state.tours = action.payload;
                state.loading = false;
            })
            .addCase(fetchTours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tours';
            });
    },
});

export default tourSlice.reducer;
