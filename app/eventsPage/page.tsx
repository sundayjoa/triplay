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

const EventsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, loading, error } = useSelector((state: RootState) => state.event);
    const [selectedAreaCode, setSelectedAreaCode] = useState<string>('');

    useEffect(() => {
        dispatch(fetchEventsByArea(selectedAreaCode));
    }, [dispatch, selectedAreaCode]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const eventImages = events.map(event => ({
        id: event.contentid,
        imageUrl: event.firstimage,
        description: event.title,
        place: event.addr1,
        date: "sample"
    }));

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