"use client";

import { useSearchParams, useRouter } from 'next/navigation';

export default function DetailPage() {
    const searchParams = useSearchParams();
    const eventid = searchParams.get('eventid');
    const imageAddress = searchParams.get('imageAddress') || '';

    if (!eventid) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Event Detail for {eventid}</h1>
            {imageAddress && <img src={imageAddress} alt="Event Image" />}
            {/* eventid에 따라 이벤트의 세부 정보를 렌더링합니다 */}
        </div>
    );
}

