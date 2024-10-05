import React from "react";
import { formatNumber } from "../utils";

const HeadorTailResult = ({
  i,
  take,
  spend,
  isWon,
  outcome,
  status,
}: {
  i: number | string;
  take: "Head" | "Tail";
  spend: number;
  isWon: boolean;
  outcome: number;
  status: string;
}) => {
  return (
    <div className="w-full h-[53px] bg-[#242628] rounded-[24px] flex px-[30px] items-center justify-between">
      <span className="w-[55%] flex items-center gap-[10px]">
        <p className="text-[14px] font-[600] opacity-60">#{i}</p>
        <p
          className={`${
            take === "Head" ? "text-[#0058DB]" : "text-red"
          } flex-1 font-[600] text-[12px]`}
        >
          {take}
        </p>
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

export default HeadorTailResult;
