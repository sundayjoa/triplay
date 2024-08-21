import React, {useState} from 'react';
import Link from 'next/link';

interface ImageData{
    id: string; 
    imageUrl: string | null; 
    description: string | null; 
    place: string | null;
    date: string | null
}

const Slider: React.FC<{images: ImageData[]} >= ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    //이미지 배열이 3개 미만일 경우 부족한 슬라이드를 null 값으로 채우기
    const filledImages = {
        ...images,
        ...Array(Math.max(0, 3 - images.length)).fill({
            id: 'null',
            imageUrl: null,
            description: null,
            place: null,
            date: null
        }),
    };

    const handleNext = () => {
        if(currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if(currentIndex > 0){
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="slider-container">
            <button className='prev-btn' onClick={handlePrev} disabled={currentIndex===0}>{' <'}</button>
            <div className='image-container'>
                {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
                    <div className="image-card" key={image.id + index}>
                        <img className="image" src={image.imageUrl ?? undefined} alt={`Slide ${index + 1}`} />
                        <div className="description"> 
                            <div className='events-title'>
                                <h2>{image.description || null}</h2>
                                <p className='events-place'>{image.place || null}</p>
                                <p className='events-date'>{image.date || null}</p>
                            </div>
                            <Link href="#" className='events-link'>구경가기</Link>
                        </div>
                    </div>
                ))}
            </div>
            <button className="next-btn" onClick={handleNext} disabled={currentIndex >= filledImages.length - 3}>{'>'}</button>
        </div>
    );
};

export default Slider;