'use client';

import React, { useState } from "react";
import "@/app/styles/eventimage.css";

interface ImageSliderProps {
    images: { originimgurl: string; imgname: string; smallimageurl: string; }[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            if (newIndex < 0) {
                // 마지막 3개로 이동
                return Math.max(0, images.length - 3);
            }
            return newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            if (newIndex >= images.length - 2) {
                // 처음 3개로 이동
                return 0;
            }
            return newIndex;
        });
    };

    // 현재 인덱스에서 3개의 이미지를 잘라냄
    const displayedImages = images.slice(currentIndex, currentIndex + 3);

    // 이미지가 3개보다 적을 경우 빈 슬롯을 채움
    while (displayedImages.length < 3) {
        displayedImages.push(undefined as any); // 빈 슬롯을 undefined로 채움
    }


    return (
        <div className="image-slider">
            <button onClick={handlePrev} className="slider-btn prev-btn">{'<'}</button>
            <div className="slider-wrapper">
                {displayedImages.map((image, index) => (
                    <div key={index} className="image-card-container">
                        {image ? (
                            <img src={image.originimgurl} alt={image.imgname} className="image-card" />
                        ) : (
                            <div className="image-placeholder"></div>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={handleNext} className="slider-btn next-btn">{'>'}</button>
        </div>
    );
};

export default ImageSlider;