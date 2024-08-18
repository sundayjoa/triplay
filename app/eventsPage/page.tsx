"use client";

import Navbar from "@/components/Navbar";
import '../styles/events.css';
import RegionSelect from '@/components/RegionSelect';
import Calendar from '@/components/Calendar';
import Slider from "@/components/Slider";

const EventsPage: React.FC = () => {
    
    const images = [
        { id: 1, imageUrl: 'https://via.placeholder.com/150', description: 'Sample 1' , place: '서울 특별시 은평구', date: '2023-12-11 ~ 2023-12-16' },
        { id: 2, imageUrl: 'https://via.placeholder.com/150', description: 'Sample 2' , place: '서울 특별시 은평구', date: '2023-12-11 ~ 2023-12-16' },
        { id: 3, imageUrl: 'https://via.placeholder.com/150', description: 'Sample 3' , place: '서울 특별시 은평구', date: '2023-12-11 ~ 2023-12-16' },
        { id: 4, imageUrl: 'https://via.placeholder.com/150', description: 'Sample 4' , place: '서울 특별시 은평구', date: '2023-12-11 ~ 2023-12-16' },
        { id: 5, imageUrl: 'https://via.placeholder.com/150', description: 'Sample 5' , place: '서울 특별시 은평구', date: '2023-12-11 ~ 2023-12-16' },
    ];

    return (
        <main>
            <Navbar />
            <RegionSelect />
            <Calendar />
            <Slider images={images} />
        </main>
    );
};

export default EventsPage;