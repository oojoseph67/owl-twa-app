import React from "react";
import { formatNumber } from "../utils";

const OPTIONS: { take: "0.0x" | "1.2x" | "1.7x" | "2.5x"; color: string }[] = [
  { take: "0.0x", color: "#329FF9" },
  { take: "1.2x", color: "#19D852" },
  { take: "1.7x", color: "#FFBD29" },
  { take: "2.5x", color: "#FC3DD8" },
];

const SpinResult = ({
  i,
  take,
  spend,
  isWon,
  outcome,
}: {
  i: number | string;
  take: "0.0x" | "1.2x" | "1.7x" | "2.5x";
  spend: number;
  isWon: boolean;
  outcome: number;
}) => {
  const bg_color = OPTIONS.find((opt) => opt.take === take)?.color;

  return (
    <div className="w-full h-[53px] bg-[#242628] rounded-[24px] flex px-[30px] items-center justify-between">
      <span className="w-[55%] flex items-center gap-[10px]">
        <p className="text-[14px] font-[600] opacity-60">#{i}</p>
        <div className="flex-1">
          <div
            style={{ backgroundColor: bg_color }}
            className={`w-[49px] h-[21px] rounded-[4px] text-[10px] font-[500] grid place-items-center`}
          >
            {take}
          </div>
        </div>
      </span>

      <div className="flex-1 flex items-center justify-between">
        <span className="flex flex-col items-center">
          <p className="text-[10px] font-[500] opacity-60 leading-[1.0]">
            Spent
          </p>
          <p className="text-[10px] font-[600]">{formatNumber(spend)}</p>
        </span>

        {/* <span className="flex flex-col items-center">
          <p className="text-[10px] font-[500] opacity-60 leading-[1.0]">
            Reward
          </p>
          <p className="text-[10px] font-[600]">{formatNumber(outcome)}</p>
        </span> */}
        <span className="flex flex-col items-center">
          <p
            className={`${
              isWon ? "text-[#056F3D]" : "text-[red]"
            } text-[10px] font-[500] opacity-60 leading-[1.0]`}
          >
            {isWon ? "Won" : "Lost"}
          </p>
          <p className="text-[10px] font-[600] capitalize">
            {formatNumber(outcome)}
          </p>
        </span>
      </div>
    </div>
  );
};

export default SpinResult;
