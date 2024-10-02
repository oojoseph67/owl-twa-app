import { useEffect, useState } from "react";
import bird from "../assets/bird2.png";
import HeadorTailResult from "../components/HoT-Result";
import Slider from "../components/Slider";
import { useGetUserQuery } from "../modules/query";
import { customUserTelegramId } from "../utils/config";
import { useTelegramContext } from "../context/TelegramContext";
import useOwlTWAStore, { Result } from "../utils/store";

const MIN_SPEND = 100;

const HeadorTail = () => {
  const { userTelegramId } = useTelegramContext();

  const { data: userQueryData } = useGetUserQuery({
    userTelegramId: customUserTelegramId,
  });

  const { userData } = userQueryData || {};
  const { points: userPoints } = userData || {};

  console.log({ userPoints, userData });

  const { results, addResult, setHeadOrTailResult } = useOwlTWAStore();
  console.log({ results });

  const [spend, setSpend] = useState<number>(MIN_SPEND);
  const [selectedBet, setSelectedBet] = useState<string | null>("Head");
  const [result, setResult] = useState<Result | null>();
  const [displayWining, setDisplayWining] = useState(false);

  console.log({ selectedBet, spend });

  const handleBet = () => {
    if (!selectedBet || !spend) return;

    // run mutation to subtract spend from user points

    console.log("inside handlebet", { selectedBet, spend });

    const headOrTailResult = setHeadOrTailResult({ selectedBet, spend });
    console.log({ headOrTailResult });

    const results = {
      bet: selectedBet,
      spend,
      outcome: headOrTailResult?.outcome,
      status: headOrTailResult?.status,
    };
    addResult(results);

    console.log("results inside addResult", { results });

    setDisplayWining(true);
    setResult(headOrTailResult as Result | null);
    setTimeout(() => {
      setDisplayWining(false);
      setResult(null);
    }, 5000);

    // run mutation to add outcome to user points if win
  };

  return (
    <div className="h-full w-full relative overflow-y-auto overflow-x-hidden px-[19px] py-[20px]">
      <h1 className="text-[32px] font-[600] text-center">Head or Tail</h1>

      <div className="mt-[20px] bg-[#242628] w-full h-[380px] rounded-[16px] px-[20px] py-[20px] flex flex-col items-center">
        <img className="h-[139px]" src={bird} alt="bird" />

        <div className="w-full mt-[20px]">
          {!displayWining ? (
            <>
              <div className="w-full flex justify-between gap-[10px]">
                <button
                  className={`w-[50%] h-[43px] rounded-[8px] font-[600] ${
                    selectedBet === "Head" ? "bg-[#001E4B]" : "bg-gray-500"
                  }`}
                  onClick={() => setSelectedBet("Head")}
                >
                  Head
                </button>
                <button
                  className={`w-[50%] h-[43px] rounded-[8px] font-[600] ${
                    selectedBet === "Tail" ? "bg-red" : "bg-gray-500"
                  }`}
                  onClick={() => setSelectedBet("Tail")}
                >
                  Tail
                </button>
              </div>

              {/* Use the reusable Slider component */}
              <Slider
                balance={userPoints || 0}
                spend={spend}
                minSpend={MIN_SPEND}
                onChange={(newSpend) => setSpend(newSpend)}
              />

              <button
                className="mt-[10px] w-full h-[43px] bg-red rounded-[8px] font-[600]"
                onClick={handleBet}
              >
                {"Head or Tail"}
              </button>
            </>
          ) : (
            <div
              className={`${
                displayWining ? "border-[#056F3D]" : "border-red"
              } w-full h-[155px] border-[3px] rounded-[8px] flex flex-col items-center justify-center`}
            >
              <div className="dots mb-[5px] flex gap-[3px]">
                <div className="size-[5px] bg-white rounded-full opacity-60" />
                <div className="size-[5px] bg-white rounded-full opacity-60" />
                <div className="size-[5px] bg-white rounded-full opacity-60" />
              </div>
              <p className="font-[600] leading-[1.1]">
                You {displayWining ? "Won" : "Lost"}
              </p>
              <p className="font-[600] text-[10px] opacity-60">300$REDBIRD</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[20px] w-full">
        <p className="font-[500] opacity-60">Results</p>

        <div className="mt-[5px] space-y-[3px]">
          {results.map((result, index) => {
            console.log({ result });
            if (result.bet === null) return;
            return (
              <HeadorTailResult
                key={index}
                i={index + 1}
                take={result.bet}
                spend={result.spend}
                outcome={result.status}
                isWon={result.status.toLowerCase() === "won" ? true : false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeadorTail;
