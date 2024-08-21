"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import '../styles/events.css';
import RegionSelect from '@/components/RegionSelect';
import Calendar from '@/components/Calendar';
import Slider from "@/components/Slider";
import { fetchEventsByArea } from '@/store/slices/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const EventsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, loading, error } = useSelector((state: RootState) => state.event);
    const selectedDateString = useSelector((state: RootState) => state.date.selectedDate);
    const selectedDate = dayjs(selectedDateString); // 날짜 형식 변환
    const [selectedAreaCode, setSelectedAreaCode] = useState<string>('');

    //지역 선택 필터링
    useEffect(() => {
        dispatch(fetchEventsByArea({ areaCode: selectedAreaCode, date: selectedDate.format('YYYYMMDD') }));
    }, [dispatch, selectedAreaCode, selectedDate]);

    useEffect(() => {
        dispatch(fetchEventsByArea({ areaCode: '', date: selectedDate.format('YYYYMMDD') }));
    }, [dispatch, selectedDate]);

    //선택된 날짜에 따라 이벤트 필터링
    const filteredEvents = events.filter(event => {
        const eventStart = dayjs(event.eventstartdate);
        const eventEnd = dayjs(event.eventenddate);
        return selectedDate.isBetween(eventStart, eventEnd, null, '[]');
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const eventImages = filteredEvents.map(event => {
        return {
            id: event.contentid,
            imageUrl: event.firstimage || null, // null 처리
            description: event.title || null,  // null 처리
            place: event.addr1 || event.eventplace || null, // null 처리
            date: `${event.eventstartdate || 'N/A'} ~ ${event.eventenddate || 'N/A'}` // null 처리
        };
    });


    return (
        <main>
            <Navbar />
            <RegionSelect onChange={setSelectedAreaCode} selectedAreaCode={selectedAreaCode} />
            <Calendar />
            <Slider images={eventImages} />
            <div className="events-pages">

            </div>
        </main>
    );
};

export default EventsPage;