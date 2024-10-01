import React, { useState } from "react";
import bird from "../assets/bird3.png";
import HeadorTailResult from "../components/HoT-Result";
import Slider from "../components/Slider";

const MIN_SPEND = 100;

const HeadorTail = () => {
  const [balance, setBalance] = useState<number>(2142);
  const [spend, setSpend] = useState<number>(MIN_SPEND);

  return (
    <div className="h-full w-full relative overflow-y-auto overflow-x-hidden px-[19px] py-[20px]">
      <h1 className="text-[32px] font-[600] text-center">Head or Tail</h1>

      <div className="mt-[20px] bg-[#242628] w-full h-[380px] rounded-[16px] px-[20px] py-[20px] flex flex-col items-center">
        <img src={bird} alt="bird" />

        <div className="w-full mt-[20px]">
          {true ? (
            <>
              <div className="w-full flex justify-between gap-[10px]">
                <button className="w-[50%] h-[43px] bg-[#001E4B] rounded-[8px] font-[600]">
                  Head
                </button>
                <button className="w-[50%] h-[43px] bg-red rounded-[8px] font-[600]">
                  Tail
                </button>
              </div>

              {/* Use the reusable Slider component */}
              <Slider
                balance={balance}
                spend={spend}
                minSpend={MIN_SPEND}
                onChange={(newSpend) => setSpend(newSpend)}
              />

              <button className="mt-[10px] w-full h-[43px] bg-red rounded-[8px] font-[600]">
                {false ? "Flip" : "Head or Tail"}
              </button>
            </>
          ) : (
            <div
              className={`${
                true ? "border-[#056F3D]" : "border-red"
              } w-full h-[155px] border-[3px] rounded-[8px] flex flex-col items-center justify-center`}
            >
              <div className="dots mb-[5px] flex gap-[3px]">
                <div className="size-[5px] bg-white rounded-full opacity-60" />
                <div className="size-[5px] bg-white rounded-full opacity-60" />
                <div className="size-[5px] bg-white rounded-full opacity-60" />
              </div>
              <p className="font-[600] leading-[1.1]">
                You {true ? "Won" : "Lost"}
              </p>
              <p className="font-[600] text-[10px] opacity-60">300$REDBIRD</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[20px] w-full">
        <p className="font-[500] opacity-60">Results</p>

        <div className="mt-[5px] space-y-[3px]">
          <HeadorTailResult
            i="1"
            take="Tail"
            spend={150}
            outcome={300}
            isWon={true}
          />
          <HeadorTailResult
            i="2"
            take="Head"
            spend={500}
            outcome={500}
            isWon={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HeadorTail;
