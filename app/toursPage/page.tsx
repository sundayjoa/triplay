"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import '../styles/tours.css';
import RegionSelect from '@/components/RegionSelect';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import ToursTag from '@/components/ToursTag';

const ToursPage: React.FC = () => {
    const [selectedAreaCode, setSelectedAreaCode] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const [selectedTag, setSelectedTag] = useState<{ cat1: string; cat2: string; cat3: string }>({
        cat1: '',
        cat2: '',
        cat3: ''
    });

    const handleTagChange = (tag: { cat1: string; cat2: string; cat3: string }) => {
        setSelectedTag(tag);
    };

    const handleAreaChange = (areaCode: string) => {
        setSelectedAreaCode(areaCode);
    };

    return (
        <main>
            <Navbar />
            <div>
                <RegionSelect onChange={handleAreaChange} selectedAreaCode={selectedAreaCode} />
                <ToursTag onChange={handleTagChange} selectedTag={selectedTag}/>
            </div>
        </main>
    );
};

export default ToursPage;