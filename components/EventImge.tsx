'use client';

import React, { useState } from "react";

interface ImageSliderProps {
    images: { originimgurl: string; imgname: string; smallimageurl: string; }[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="slider">
            <img src={images[currentIndex].originimgurl} alt={images[currentIndex].imgname} />
            {images.length > 1 && (
                <>
                    <button onClick={handlePrev}>{'<'}</button>
                    <button onClick={handleNext}>{'>'}</button>
                </>
            )}
        </div>
    );
};

export default ImageSlider;