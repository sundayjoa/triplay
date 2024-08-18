import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import dayjs, {Dayjs} from 'dayjs';

interface Datestate {
    selectedDate: Dayjs;
}

//현재 날짜로 초기화
const initialState: Datestate = {
    selectedDate: dayjs(),
};

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setselectedDate: (state, action: PayloadAction<Dayjs>) => {
            state.selectedDate = action.payload;
        },
        incrementDate: (state) => {
            state.selectedDate = state.selectedDate.add(1, 'day');
        },
        decrementDate: (state) => {
            state.selectedDate = state.selectedDate.subtract(1, 'day');
        },
    },
});

export const { setselectedDate, incrementDate, decrementDate} = dateSlice.actions;

export const selectDate = (state: RootState) => state.date.selectedDate;

export default dateSlice.reducer;