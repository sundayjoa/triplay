"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import '../styles/events.css';
import RegionSelect from '@/components/RegionSelect';
import Calendar from '@/components/Calendar';
import Slider from "@/components/Slider";
import { fetchEventsByArea, fetchEventDetails } from '@/store/slices/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';

const EventsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, loading, error } = useSelector((state: RootState) => state.event);
    const [selectedAreaCode, setSelectedAreaCode] = useState<string>('');
    const [eventDetailsMap, setEventDetailsMap] = useState<Record<string, { eventstartdate: string, eventenddate: string }>>({});
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    

    useEffect(() => {
        dispatch(fetchEventsByArea(selectedAreaCode));
    }, [dispatch, selectedAreaCode]);

    useEffect(() => {
        const fetchDetails = async () => {
            const detailsMap: Record<string, { eventstartdate: string, eventenddate: string }> = {};

            for (const event of events) {
                try {
                    const response = await fetchEventDetails(event.contentid);
                    if (response && response.eventstartdate && response.eventenddate) {
                        detailsMap[event.contentid] = {
                            eventstartdate: response.eventstartdate,
                            eventenddate: response.eventenddate
                        };
                    }
                } catch (error) {
                    console.error(`Failed to fetch details for event ${event.contentid}:`, error);
                }
            }

            setEventDetailsMap(detailsMap);
        };

        fetchDetails();
    }, [events]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    //날짜 필터링
    const filteredEvents = events.filter(event => {
        const eventDetails = eventDetailsMap[event.contentid];
        if (!eventDetails) return false;

        const { eventstartdate, eventenddate } = eventDetails;

        return selectedDate >= eventstartdate && selectedDate <= eventenddate;
    });

    const eventImages = filteredEvents.map(event => {
        const startDate = eventDetailsMap[event.contentid]?.eventstartdate;
        const endDate = eventDetailsMap[event.contentid]?.eventenddate;
        
        return {
            id: event.contentid,
            imageUrl: event.firstimage,
            description: event.title,
            place: event.addr1,
            date: startDate && endDate ? `${startDate} ~ ${endDate}` : 'Unknown Date'
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