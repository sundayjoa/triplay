import { decrementDate, incrementDate, selectDate, setSelectedDate } from '@/store/slices/dateSlice';
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { FaCalendar } from "react-icons/fa";

interface CalendarProps {
    onMonthChange: (month: string) => void;
}

const months = [
    {value:'01', label: '1월'},
    {value:'02', label: '2월'},
    {value:'03', label: '3월'},
    {value:'04', label: '4월'},
    {value:'05', label: '5월'},
    {value:'06', label: '6월'},
    {value:'07', label: '7월'},
    {value:'08', label: '8월'},
    {value:'09', label: '9월'},
    {value:'10', label: '10월'},
    {value:'11', label: '11월'},
    {value:'12', label: '12월'}
];

const Calendar: React.FC<CalendarProps> = ({onMonthChange}) => {
    const dispatch = useDispatch();
    const selectedDateString = useSelector((state: RootState) => selectDate(state));
    const currentYear = dayjs().format('YYYY');
    const currentMonth = dayjs().format('MM');

    const [isOpen, setIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
    const currentMonthLabel = months.find(m => m.value === currentMonth)?.label || '';
    const [selectedMonthLabel, setSelectedMonthLabel] = useState<string>(currentMonthLabel);

    useEffect(() => {
        if (!selectedDateString) {
            const initialDate = `${currentYear}${currentMonth}`;
            dispatch(setSelectedDate(initialDate));
            setSelectedMonth(currentMonth);
            setSelectedMonthLabel(currentMonthLabel);
        } else {
            const initialMonth = selectedDateString.slice(4, 6);
            setSelectedMonth(initialMonth);
            setSelectedMonthLabel(months.find(m => m.value === initialMonth)?.label || currentMonthLabel);
        }
    }, [dispatch, selectedDateString, currentYear, currentMonth, currentMonthLabel]);

    const handleMonthChange = (month: { value: string; label: string }) => {
        setSelectedMonth(month.value);
        setSelectedMonthLabel(month.label);
        const updatedDate = `${currentYear}${month.value}`;
        dispatch(setSelectedDate(updatedDate));
        setIsOpen(false); 
        onMonthChange(updatedDate);
    };

    return (
        <div className='calendar-container'>
            <FaCalendar className='icon' />
            <div className='regionFilter' onClick={() => setIsOpen(!isOpen)}>
                {selectedMonthLabel}
            </div>
            {isOpen && (
                <div className='dropdownList'>
                    {months.map((month) => (
                        <div
                            key={month.value}
                            className='dropdownItem'
                            onClick={() => handleMonthChange(month)}
                        >
                            {month.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Calendar;

