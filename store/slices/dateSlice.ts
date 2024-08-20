import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import dayjs, { Dayjs } from 'dayjs';

interface DateState {
    selectedDate: string; 
}

// 현재 날짜를 문자열로 초기화
const initialState: DateState = {
    selectedDate: dayjs().toISOString(),
};

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<string>) => {
            state.selectedDate = action.payload;
        },
        incrementDate: (state) => {
            state.selectedDate = dayjs(state.selectedDate).add(1, 'day').toISOString(); 
        },
        decrementDate: (state) => {
            state.selectedDate = dayjs(state.selectedDate).subtract(1, 'day').toISOString(); 
        },
    },
});

export const { setSelectedDate, incrementDate, decrementDate } = dateSlice.actions;

export const selectDate = (state: RootState) => state.date.selectedDate;

export default dateSlice.reducer;
