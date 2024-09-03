import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { RootState } from '../store';

//축제 이미지 데이터
interface ImageData {
    originimgurl: string;
    imgname: string;
    smallimageurl: string;
}

//상세 데이터
interface EventDetailData{
    contentid: string;
    sponsor1: string | null;
    sponsor1tel: string | null;
    sponsor2: string | null;
    sponsor2tel: string | null;
    eventenddate: string | null;
    playtime: string | null;
    eventplace: string | null;
    eventhomepage: string | null;
    agelimit: string | null;
    program: string | null;
    eventstartdate: string | null;
    usetimefestival: string | null;
    discountinfofestival: string | null;
    spendtimefestival: string | null;
    festivalgrade: string | null;
    //이미지 데이터 추가
    images: ImageData[];
}

interface EventDetailState {
    eventDetail: EventDetailData | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: EventDetailState = {
    eventDetail: null,
    status: 'idle',
};

export const fetchEventDetail = createAsyncThunk(
    'eventDetail/fetchEventDetail',
    async (contentId: string) => {
        const eventApiKey = process.env.NEXT_PUBLIC_TOUR_APP_API_KEY;
        const response = await fetch(`http://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=${eventApiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&imageYN=Y&subImageYN=Y`);
        const data = await response.json();

        // 이미지 데이터 추출
        const images: ImageData[] = data.response.body.items.item.map((item: any) => ({
            originimgurl: item.originimgurl,
            imgname: item.imgname,
            smallimageurl: item.smallimageurl,
        }));

        const eventDetail: EventDetailData = {
            contentid: contentId,
            sponsor1: null,
            sponsor1tel: null,
            sponsor2: null,
            sponsor2tel: null,
            eventenddate: null,
            playtime: null,
            eventplace: null,
            eventhomepage: null,
            agelimit: null,
            program: null,
            eventstartdate: null,
            usetimefestival: null,
            discountinfofestival: null,
            spendtimefestival: null,
            festivalgrade: null,
            images, // 이미지 배열 추가
        };
        return eventDetail;
    }
);

export const eventDetailSlice = createSlice({
    name: 'eventDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEventDetail.fulfilled, (state, action) => {
                state.status = 'idle';
                state.eventDetail = action.payload;
            })
            .addCase(fetchEventDetail.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectEventDetail = (state: RootState) => state.eventdetail.eventDetail;
export const selectEventDetailStatus = (state: RootState) => state.eventdetail.status;

export default eventDetailSlice.reducer;