import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

interface BoardData {
    eventid: string;
    imageAddress: string | null;
    title: string | null; 
    eventplace: string | null;
    eventdate: string | null;
}

//행사 진행 여부
const calculateEventStatus = (startDate: string, endDate: string): { status: string, className: string, order: number } => {
    const today = dayjs();
    const start = dayjs(startDate, 'YYYYMMDD');
    const end = dayjs(endDate, 'YYYYMMDD');

    if(today.isBefore(start)) {
        return { status: `D-${start.diff(today, 'day')}`, className: 'upcoming', order: 1 };
    } else if (today.isAfter(end)) {
        return { status: '종료', className: 'completed', order: 3};
    } else {
        return { status: '진행 중', className: 'in-progress', order: 2};
    }
};

const EventsBoard: React.FC<{ Data: BoardData[] }> = ({ Data = [] }) => {
    const [filter, setFilter] = useState<'in-progress' | 'completed' | 'upcoming' | null>(null);

    useEffect(() => {
        // 클라이언트 사이드에서만 localStorage에 접근
        if (typeof window !== 'undefined') {
            const storedFilter = localStorage.getItem('event-filter') as 'in-progress' | 'completed' | 'upcoming' | null;
            if (storedFilter) {
                setFilter(storedFilter);
            }
        }
    }, []);

    const handleFilterChange = (newFilter: 'in-progress' | 'completed' | 'upcoming') => {
        setFilter(newFilter);
        if (typeof window !== 'undefined') {
            localStorage.setItem('event-filter', newFilter);
        }
    };

    // 상태에 따라 필터링
    const filteredData = filter
        ? Data.filter(item => {
            const { className } = calculateEventStatus(item.eventdate?.split(' ~ ')[0] || '', item.eventdate?.split(' ~ ')[1] || '');
            return className === filter;
        })
        : Data;

    return (
        <main>
            <h1 className='event-board-title'>축제/공연/행사</h1>
            
            {/* 필터 버튼 */}
            <div className="filter-buttons">
                <button 
                    onClick={() => handleFilterChange('in-progress')} 
                    className={`filter-button ${filter === 'in-progress' ? 'active' : ''}`}
                >
                    진행중
                </button>
                <button 
                    onClick={() => handleFilterChange('upcoming')} 
                    className={`filter-button ${filter === 'upcoming' ? 'active' : ''}`}
                >
                    진행예정
                </button>
                <button 
                    onClick={() => handleFilterChange('completed')} 
                    className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                >
                    종료
                </button>
            </div>
            <hr className='devider' />
            <a href="#">
                <div className='event-card-container'>
                    {filteredData.map((item, index) => {
                        const { status, className } = calculateEventStatus(item.eventdate?.split(' ~ ')[0] || '', item.eventdate?.split(' ~ ')[1] || '');
                        return (
                            <div key={index} className='event-card'>
                                <div className={`event-status ${className}`}>{status}</div>
                                <img src={item.imageAddress ?? ''} className="event-image" />
                                <h2 className='event-title'>{item.title || ''}</h2>
                                <p className='event-place'>{item.eventplace || ''}</p>
                                <p className='event-date'>{item.eventdate || ''}</p>
                            </div>
                        );
                    })}
                </div>
            </a>
        </main>
    );
};

export default EventsBoard;