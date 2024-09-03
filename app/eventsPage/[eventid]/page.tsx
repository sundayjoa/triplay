"use client";

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventDetail, selectEventDetail, selectEventDetailStatus } from '@/store/slices/eventdetailSlice';
import ImageSlider from '@/components/EventImge';
import { RootState } from '@/store/store';
import type { AppDispatch } from '@/store/store';

interface DetailPageProps {
    params: {
        eventid: string;
    };
}

const DetailPage: React.FC<DetailPageProps> = ({ params }) => {
    const dispatch = useDispatch<AppDispatch>();
    const eventDetail = useSelector((state: RootState) => selectEventDetail(state));
    const status = useSelector((state: RootState) => selectEventDetailStatus(state));

    const { eventid: contentId } = params;

    useEffect(() => {
        if (contentId) {
            dispatch(fetchEventDetail(contentId));
        }
    }, [contentId, dispatch]);

    if (!contentId) {
        return <p>Loading...</p>;
    }

    if (status === 'loading') {
        return <p>Loading event details...</p>;
    }

    if (status === 'failed') {
        return <p>Failed to load event details.</p>;
    }

    return (
        <div>
            <h1>Event Detail for {contentId}</h1>
            {eventDetail && (
                <div>
                    <p><strong>Content ID:</strong> {eventDetail.contentid}</p>
                    {/* 기타 이벤트 정보들 */}
                    
                    {/* 이미지 슬라이더 추가 */}
                    {eventDetail.images && eventDetail.images.length > 0 && (
                        <ImageSlider images={eventDetail.images} />
                    )}
                </div>
            )}
        </div>
    );
};

export default DetailPage;

