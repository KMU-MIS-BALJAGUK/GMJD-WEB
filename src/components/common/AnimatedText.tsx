'use client';

import { useState, useEffect } from 'react';

const AnimatedText = () => {
  const words = ['Find', 'Make', 'Build', 'Join'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span
      className={`inline-block w-[90px] sm:w-[120px] text-right text-blue transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      {words[currentIndex]}
    </span>
  );
};

export default AnimatedText;
