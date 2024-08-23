import React, {useState} from 'react';
import Link from 'next/link';

interface BoardData {
    id: string;
    imageAddress: string | null;
    place: string | null;
    date: string | null;
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
                        <h2 className='event-title'>제목</h2>
                        <p className='event-place'>위치</p>
                        <p className='event-date'>날짜</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default EventsBoard;