import React from "react";

const RPSResult = ({
  i,

  userScore,
  botScore,
  spend,
  isWon,
  outcome,
}: {
  i: number | string;

  userScore: number;
  botScore: number;
  spend: number;
  isWon: boolean;
  outcome: number;
}) => {
  return (
    <div className="w-full h-[53px] bg-[#242628] rounded-[24px] flex px-[30px] items-center justify-between">
      <span className="w-[55%] flex items-center gap-[20px]">
        <p className="text-[14px] font-[600] opacity-60">#{i}</p>
        <p className={`flex-1 font-[600] text-[12px]`}>
          <span className="text-[#FDB3C3]">{userScore}</span> -{" "}
          <span className="text-[#CD17C1]">{botScore}</span>
        </p>
      </span>

      <div className="flex-1 flex items-center justify-between">
        <span className="flex flex-col items-center">
          <p className="text-[10px] font-[500] opacity-60 leading-[1.0]">
            Spent
          </p>
          <p className="text-[10px] font-[600]">{spend}</p>
        </span>
        <span className="flex flex-col items-center">
          <p
            className={`${
              isWon ? "text-[#056F3D]" : "text-[red]"
            } text-[10px] font-[500] opacity-60 leading-[1.0]`}
          >
            {isWon ? "Won" : "Lost"}
          </p>
          <p className="text-[10px] font-[600]">{outcome}</p>
        </span>
      </div>
    </div>
  );
};

export default RPSResult;
