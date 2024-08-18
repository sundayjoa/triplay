import { decrementDate, incrementDate, selectDate, setselectedDate } from '@/store/slices/dateSlice';
import { RootState } from '@/store/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

const Calendar: React.FC = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state: RootState) => selectDate(state));

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setselectedDate(dayjs(event.target.value)));
    };

    const handlePrevDay = () => {
        dispatch(decrementDate());
    };

    const handleNextDay = () => {
        dispatch(incrementDate());
    };

    return (
        <div className='calendar-container'>
            <div className='calendar-filter'>
                <button onClick={handlePrevDay}>{'<'}</button>
                <input className="calendar-date" type="date" value={selectedDate.format('YYYY-MM-DD')} onChange={handleDateChange} />
                <button className="nextdate-btn" onClick={handleNextDay}>{'>'}</button>
            </div>
        </div>
    );
};

export default Calendar;