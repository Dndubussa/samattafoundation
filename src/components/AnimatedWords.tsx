import { useState, useEffect, useRef } from "react";

interface AnimatedWordsProps {
  words: string[];
  className?: string;
  interval?: number;
}

const AnimatedWords = ({
  words,
  className = "",
  interval = 2800,
}: AnimatedWordsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "hiding" | "hidden">("visible");
  const containerRef = useRef<HTMLSpanElement>(null);
  const [minWidth, setMinWidth] = useState(0);

  // Measure the widest word to prevent layout shift
  useEffect(() => {
    if (!containerRef.current) return;
    let max = 0;
    const measurer = document.createElement("span");
    measurer.style.visibility = "hidden";
    measurer.style.position = "absolute";
    measurer.style.fontFamily = getComputedStyle(containerRef.current).fontFamily;
    measurer.style.fontWeight = getComputedStyle(containerRef.current).fontWeight;
    measurer.style.fontSize = getComputedStyle(containerRef.current).fontSize;
    document.body.appendChild(measurer);
    words.forEach((w) => {
      measurer.textContent = w;
      max = Math.max(max, measurer.offsetWidth);
    });
    document.body.removeChild(measurer);
    setMinWidth(max);
  }, [words]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Step 1: fade-slide out
      setPhase("hiding");
      setTimeout(() => {
        // Step 2: swap word
        setCurrentIndex((i) => (i + 1) % words.length);
        setPhase("hidden");
        setTimeout(() => {
          // Step 3: fade-slide in
          setPhase("visible");
        }, 50);
      }, 320);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  const style: React.CSSProperties = {
    display: "inline-block",
    minWidth: minWidth > 0 ? minWidth : undefined,
    transition: "opacity 0.32s cubic-bezier(0.4, 0, 0.2, 1), transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: phase === "hiding" || phase === "hidden" ? 0 : 1,
    transform:
      phase === "hiding"
        ? "translateY(-12px)"
        : phase === "hidden"
        ? "translateY(12px)"
        : "translateY(0)",
  };

  return (
    <span ref={containerRef} className={`inline-block ${className}`} style={style}>
      {words[currentIndex]}
    </span>
  );
};

export default AnimatedWords;
