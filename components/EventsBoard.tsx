import React, {useState} from 'react';
import Link from 'next/link';

interface BoardData {
    eventid: string;
    imageAddress: string | null;
    title: string | null; 
    eventplace: string | null;
    eventdate: string | null;
}

const EventsBoard: React.FC<{Data: BoardData[]}> = ({Data = [] }) => {
    return(
        <main>
            <h1 className='event-board-title'>축제/공연/행사</h1>
            <hr className='devider' />
            <div className='event-card-container'>
                {Data.map((item, index) => (
                    <div key={index} className='event-card'>
                        <img src={item.imageAddress ?? ''} className="event-image" />
                        <h2 className='event-title'>{item.title || ''}</h2>
                        <p className='event-place'>{item.eventplace || ''}</p>
                        <p className='event-date'>{item.eventdate || ''}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default EventsBoard;