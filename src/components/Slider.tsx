import React, { useRef, useState } from "react";
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
  const sliderRef = useRef<HTMLButtonElement | null>(null); // Update type to HTMLButtonElement

  // Function to calculate spend based on slider width
  const calculateSpend = (clientX: number): void => {
    if (!sliderRef.current) return;

    const sliderWidth = sliderRef.current.offsetWidth;
    const offsetLeft = sliderRef.current.getBoundingClientRect().left;
    let sliderPercentage = ((clientX - offsetLeft) / sliderWidth) * 100;

    if (sliderPercentage < 0) sliderPercentage = 0;
    if (sliderPercentage > 100) sliderPercentage = 100;

    const newSpend = minSpend + ((balance - minSpend) * sliderPercentage) / 100;

    onChange(newSpend);
  };

  // Function to handle dragging for desktop (mouse)
  const handleMouseDrag = (e: MouseEvent): void => {
    calculateSpend(e.clientX);
  };

  // Function to handle dragging for mobile (native touch event)
  const handleTouchDrag = (e: TouchEvent): void => {
    calculateSpend(e.touches[0].clientX); // Use the first touch point
  };

  // Function to start dragging with mouse
  const handleMouseDown = (): void => {
    document.addEventListener("mousemove", handleMouseDrag);
    document.addEventListener("mouseup", handleMouseUp);
  };
  // Function to start dragging with touch
  const handleTouchStart = (): void => {
    document.addEventListener("touchmove", handleTouchDrag);
    document.addEventListener("touchend", handleTouchEnd);
  };
  // Function to stop mouse dragging
  const handleMouseUp = (): void => {
    document.removeEventListener("mousemove", handleMouseDrag);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  // Function to stop touch dragging
  const handleTouchEnd = (): void => {
    document.removeEventListener("touchmove", handleTouchDrag);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div className="w-full mt-[7px]">
      <div className="flex justify-between items-center mb-[3px]">
        <p className="text-[12px] font-[500]">Balance: {balance.toFixed(0)}</p>
        <p className="text-[12px] font-[500]">Spend: {spend.toFixed(0)}</p>
      </div>

      <div className="w-full h-[45px] rounded-[8px] bg-[#121314] flex justify-between items-center px-[10px] gap-[10px]">
        <p className="text-[10px]">Min</p>
        <div className="flex-1 w-full">
          <button
            ref={sliderRef}
            disabled={disabled}
            className={`relative w-full h-[7px] bg-white rounded ${
              disabled ? "opacity-60" : ""
            }`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div
              className="absolute h-full bg-red rounded"
              style={{
                width: `${((spend - minSpend) / (balance - minSpend)) * 100}%`,
              }}
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `calc(${
                  ((spend - minSpend) / (balance - minSpend)) * 100
                }% - 10px)`,
              }}
            >
              <img className="w-[27px]" src={smallbird} alt="bird" />
            </div>
          </button>
        </div>
        <p className="text-[10px]">All</p>
      </div>
    </div>
  );
};

export default Slider;
