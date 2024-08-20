import React, {useState} from 'react';
import Link from 'next/link';

interface ImageData{
    id: string;
    imageUrl: string;
    description: string;
    place: string;
    date: string;
}

const Slider: React.FC<{images: ImageData[]} >= ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
                    <div className="image-card" key={image.id}>
                        <img className="image" src={image.imageUrl} alt={`Slide ${index + 1}`} />
                        <div className="description"> 
                            <div className='events-title'>
                                <h2>{image.description}</h2>
                                <p className='events-place'>{image.place}</p>
                                <p className='events-date'>{image.date}</p>
                            </div>
                            <Link href="#" className='events-link'>구경가기</Link>
                        </div>
                    </div>
                ))}
            </div>
            <button className="next-btn" onClick={handleNext} disabled={currentIndex >= images.length - 3}>{'>'}</button>
        </div>
    );
};

export default Slider;