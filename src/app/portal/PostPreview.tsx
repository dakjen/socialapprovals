"use client";

import React, { useState } from 'react';

const PostPreview = ({ images, caption, username, date, profilePicUrl }: { images: string[], caption: string, username: string, date: string, profilePicUrl: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    scrollToImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    scrollToImage(newIndex);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <img src={profilePicUrl} alt="Profile" className="w-8 h-8 rounded-full mr-3 object-cover" />
          <p className="font-bold text-[#000000]">{username}</p>
        </div>
        <button className="text-2xl font-bold">&hellip;</button>
      </div>

      {/* Image Carousel */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full relative pt-[125%]" style={{ scrollSnapAlign: 'center' }}> {/* 1350/1080 = 1.25 = 125% */}
              <img src={src} alt={`Preview ${index + 1}`} className="absolute top-0 left-0 w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
            >
              &#10094;
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
            >
              &#10095;
            </button>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.54 15.243 3 13.672 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        </div>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
      </div>

      {/* Caption and Date */}
      <div className="px-4 pb-4">
        <p className="text-[#000000]"><span className="font-bold">{username}</span> {caption}</p>
        <p className="text-[#000000] text-sm opacity-50 mt-2">{date}</p>
      </div>
    </div>
  );
};

export default PostPreview;