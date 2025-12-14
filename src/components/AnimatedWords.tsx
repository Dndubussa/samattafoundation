import { useState, useEffect } from "react";

interface AnimatedWordsProps {
  words: string[];
  className?: string;
  interval?: number;
}

const AnimatedWords = ({ 
  words, 
  className = "", 
  interval = 3000 
}: AnimatedWordsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`inline-block transition-all duration-500 ${className}`}>
      <span
        className={`inline-block transition-all duration-500 ${
          isAnimating 
            ? "opacity-0 -translate-y-4 scale-95" 
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
};

export default AnimatedWords;

