import { decrementDate, incrementDate, selectDate, setSelectedDate } from '@/store/slices/dateSlice';
import { RootState } from '@/store/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

const Calendar: React.FC = () => {
    const dispatch = useDispatch();
    const selectedDateString = useSelector((state: RootState) => selectDate(state)); // 문자열로 받아옴
    const selectedDate = dayjs(selectedDateString); // Dayjs 객체로 변환
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = dayjs(event.target.value).format('YYYYMMDD');
        dispatch(setSelectedDate(selectedDate));
    };

    const handlePrevDay = () => {
        dispatch(decrementDate()); // 날짜를 감소시킴
    };

    const handleNextDay = () => {
        dispatch(incrementDate()); // 날짜를 증가시킴
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    return (
        <div className='calendar-container'>
            <div className='calendar-filter'>
                <button onClick={handlePrevDay}>{'<'}</button>
                <input
                    className="calendar-date"
                    type="date"
                    value={selectedDate.format('YYYY-MM-DD')}
                    onChange={handleDateChange}
                />
                <button className="nextdate-btn" onClick={handleNextDay}>{'>'}</button>
            </div>
        </div>
    );
};

export default Calendar;
