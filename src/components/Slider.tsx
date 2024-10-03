import React, { useRef, useEffect, useState } from "react";
import smallbird from "../assets/bird.png";

interface SliderProps {
  balance: number;
  spend: number;
  minSpend: number;
  onChange: (newSpend: number) => void;
  disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  balance,
  spend,
  minSpend,
  onChange,
  disabled,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateSpend = (clientX: number): void => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    let percentage = (clientX - rect.left) / rect.width;
    percentage = Math.max(0, Math.min(1, percentage));

    const newSpend = minSpend + (balance - minSpend) * percentage;
    onChange(Math.round(newSpend));
  };

  const handleStart = (clientX: number): void => {
    if (disabled) return;
    setIsDragging(true);
    calculateSpend(clientX);
  };

  const handleMove = (clientX: number): void => {
    if (isDragging) {
      calculateSpend(clientX);
    }
  };

  const handleEnd = (): void => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  const percentage = ((spend - minSpend) / (balance - minSpend)) * 100;

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center mb-1">
        <p className="text-xs font-medium">Balance: {balance.toFixed(0)}</p>
        <p className="text-xs font-medium">Spend: {spend.toFixed(0)}</p>
      </div>

      <div className="w-full h-12 rounded-lg bg-gray-800 flex justify-between items-center px-3 gap-3">
        <p className="text-xs">Min</p>
        <div
          ref={sliderRef}
          className={`flex-1 h-2 bg-gray-600 rounded-full relative ${disabled ? 'opacity-60' : ''}`}
          onMouseDown={(e) => handleStart(e.clientX)}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        >
          <div
            className="absolute h-full bg-red-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `calc(${percentage}% - 14px)` }}
          >
            <img className="w-7 h-7" src={smallbird} alt="bird" />
          </div>
        </div>
        <p className="text-xs">All</p>
      </div>
    </div>
  );
};

export default Slider;
