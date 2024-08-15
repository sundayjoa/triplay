"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTours } from '@/store/slices/tourSlice';
import { RootState, AppDispatch } from '@/store/store';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import '../app/styles/home.css';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { tours, loading, error } = useSelector((state: RootState) => state.tour);
  const [currentIndex, setCurrentIndex] = useState(0);

  //가져온 행사 이미지 메인 페이지에 띄우기
  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tours.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tours]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <Navbar />  
      <div className="slider">
        {tours.length > 0 && (
          <div className="slide">
            <Image
              src={tours[currentIndex].firstimage}
              alt={tours[currentIndex].title}
              layout="fill"
              objectFit="cover"
              className='bakground-image'
            />
            <div className="front-image-wrapper">
              <Image
                src={tours[currentIndex].firstimage}
                alt={tours[currentIndex].title}
                layout="fill"
                objectFit="cover"
                className='front-image'
              />
              <div className='overlay-section'>
                <h2 className='destination-heading'>어디로 떠나볼까요?</h2>
                <h2 className='select-destination'>여행지 선택</h2>
              </div>
              <h2 className='tours-title'>{tours[currentIndex].title}</h2>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
