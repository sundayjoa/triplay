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
import EventsBoard from '@/components/EventsBoard';
import {fetchEventsByAreaAndMonth } from '@/store/slices/eventboardSlice';

dayjs.extend(isBetween);

const EventsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events: areaEvents, loading: areaLoading, error: areaError } = useSelector((state: RootState) => state.event);
    const { events: monthEvents, loading: monthLoading, error: monthError, currentPage, totalPages } = useSelector((state: RootState) => state.eventboard);

    const [selectedAreaCode, setSelectedAreaCode] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>(dayjs().format('YYYY-MM'));

    // 현재 진행 중인 행사 10개 가져오기
    useEffect(() => {
        dispatch(fetchEventsByArea({ areaCode: selectedAreaCode }));
    }, [dispatch, selectedAreaCode]);

    useEffect(() => {
        dispatch(fetchEventsByArea({ areaCode: '' }));
    }, [dispatch]);
    
    // 특정 지역, 특정 월에 따른 데이터 가져오기
    useEffect(() => {
        console.log('Fetching data for area:', selectedAreaCode, 'and month:', selectedMonth);
        dispatch(fetchEventsByAreaAndMonth({ areaCode: selectedAreaCode, eventMonth: selectedMonth, page: currentPage }));
    }, [dispatch, selectedAreaCode, selectedMonth, currentPage]);

    const handleAreaChange = (areaCode: string) => {
        setSelectedAreaCode(areaCode);
        dispatch({ type: 'eventboard/setCurrentPage', payload: 1 });
    };

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
        dispatch({ type: 'eventboard/setCurrentPage', payload: 1 }); 
    };

    const handlePageChange = async(page: number) => {
        console.log('Changing to page:', page);

        // 1. 페이지 상태를 먼저 업데이트
        dispatch({ type: 'eventboard/setCurrentPage', payload: page });
    
        // 2. 페이지 상태가 업데이트된 후 데이터를 가져옴
        await dispatch(fetchEventsByAreaAndMonth({ areaCode: selectedAreaCode, eventMonth: selectedMonth, page }));
    
        // 3. 데이터 페칭 이후 상태 확인
        console.log('Updated to page:', page);
    };
    
    if (areaLoading || monthLoading) return <p>Loading...</p>;
    if (areaError || monthError) return <p>{areaError || monthError}</p>;

    // Slider에 전달할 데이터 (fetchEventsByArea에서 가져온 데이터)
    const eventImages = areaEvents.map(event => ({
        id: event.contentid,
        imageUrl: event.firstimage || null,
        description: event.title || null,
        place: event.addr1 || event.eventplace || null,
        date: `${event.eventstartdate || 'N/A'} ~ ${event.eventenddate || 'N/A'}`
    }));

    // EventsBoard에 전달할 데이터 (fetchEventsByAreaAndMonth에서 가져온 데이터)
    const eventsData = monthEvents.map(eventboard => ({
        eventid: eventboard.contentid,
        imageAddress: eventboard.firstimage || null,
        title: eventboard.title || null,
        eventplace: eventboard.addr1 || eventboard.eventplace || null,
        eventdate: `${eventboard.eventstartdate || 'N/A'} ~ ${eventboard.eventenddate || 'N/A'}`
    }));


    return (
        <main>
            <Navbar />
            <div>
                <h2 className='ongoing-events'>현재 진행 중인 행사</h2>
            </div>
            <Slider images={eventImages} />
            <div className="events-pages">
            </div>
            <div className='events-container'>
                <div>
                    <RegionSelect onChange={handleAreaChange} selectedAreaCode={selectedAreaCode} />
                    <Calendar onMonthChange={handleMonthChange} />
                    <EventsBoard Data={eventsData}/>
                    <div className="paging">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                disabled={currentPage === i + 1}
                                className={`events-paging ${currentPage === i + 1 ? 'active' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EventsPage;