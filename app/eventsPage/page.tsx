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
    const [selectedAreaCode, setSelectedAreaCode] = useState<string>('');
    const selectedDateString = useSelector((state: RootState) => state.date.selectedDate);

    //지역 선택 필터링
    useEffect(() => {
        if (selectedAreaCode) {
            dispatch(fetchEventsByArea({ areaCode: selectedAreaCode }));
        }
    }, [dispatch, selectedAreaCode]);
    
    useEffect(() => {
        dispatch(fetchEventsByArea({ areaCode: '' }));
    }, [dispatch]);

    const handleAreaChange = (areaCode: string) => {
        setSelectedAreaCode(areaCode);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const eventImages = events.map(event => {
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
            <RegionSelect onChange={handleAreaChange} selectedAreaCode={selectedAreaCode} />
            <Calendar />
            <Slider images={eventImages} />
            <div className="events-pages">

            </div>
        </main>
    );
};

export default EventsPage;