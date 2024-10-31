import { useEffect, useState } from "react";
import bird from "../assets/bird2.png";
import HeadorTailResult from "../components/HoT-Result";
import Slider from "../components/Slider";
import { useGetUserQuery } from "../modules/query";
import { useTelegramContext } from "../context/TelegramContext";
import useOwlTWAStore, { Result } from "../utils/store";
import {
  useClaimRewardsMutation,
  usePurchaseUsingPointsMutation,
} from "../modules/mutation";
import { formatNumber } from "../utils";

const MIN_SPEND = 100;

const HeadorTail = () => {
  //Show Back Button
  useEffect(() => {
    const tg = window.Telegram.WebApp;

    tg.BackButton.show();

    tg.BackButton.onClick(() => {
      window.history.back();
    });

    return () => {
      tg.BackButton.hide();
    };
  }, []);

  const { userTelegramId } = useTelegramContext();

  const purchaseUsingPointsMutation = usePurchaseUsingPointsMutation();
  const claimRewardsMutation = useClaimRewardsMutation();
  const { data: userQueryData } = useGetUserQuery({
    userTelegramId: userTelegramId,
  });

  const { userData } = userQueryData || {};
  const { points: userPoints } = userData || {};
  const { hotResults, addHOTResult, setHeadOrTailResult } = useOwlTWAStore();
  const reversedResults = hotResults.slice().reverse().slice(0, 10);

  const [spend, setSpend] = useState<number>(MIN_SPEND);
  const [selectedBet, setSelectedBet] = useState<string | null>("Head");
  const [result, setResult] = useState<Result | null>();
  const [displayWining, setDisplayWining] = useState(false);

  const canPlay = userPoints && userPoints >= MIN_SPEND;

  const handleBet = () => {
    if (!selectedBet || !spend) return;

    purchaseUsingPointsMutation.mutate(
      {
        points: Number(spend),
        userTelegramId: Number(userTelegramId),
      },
      {
        onSuccess(data, variables, context) {
          const headOrTailResult = setHeadOrTailResult({ selectedBet, spend });

          const results = {
            bet: selectedBet,
            spend,
            outcome: headOrTailResult?.outcome,
            status: headOrTailResult?.status,
          };
          addHOTResult(results as Result);

          if (headOrTailResult?.status === "won") {
            claimRewardsMutation.mutate({
              points: Number(headOrTailResult.outcome),
              userTelegramId: Number(userTelegramId),
            });
          }

          setDisplayWining(true);
          setResult(headOrTailResult as Result | null);
          setTimeout(() => {
            setDisplayWining(false);
            setResult(null);
            setSpend(MIN_SPEND);
            setSelectedBet(null);
          }, 5000);
        },
        onError(error) {
          console.error("Error during bet processing:", error);
          alert(
            "An error occurred while processing your bet. Please try again."
          );
        },
      }
    );
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
                disabled={
                  spend > userPoints ||
                  !selectedBet ||
                  !spend ||
                  !userPoints ||
                  !canPlay
                }
              >
                {canPlay ? "Head or Tail" : "Insufficient Balance"}
              </button>
            </>
          ) : (
            <div
              className={`${
                result?.status.toLowerCase() === "won"
                  ? "border-[#056F3D]"
                  : "border-red"
              } w-full h-[155px] border-[3px] rounded-[8px] flex flex-col items-center justify-center`}
            >
              <div className="dots mb-[5px] flex gap-[3px]">
                <div className="size-[5px] bg-white rounded-full opacity-60" />
                <div className="size-[5px] bg-white rounded-full opacity-60" />
                <div className="size-[5px] bg-white rounded-full opacity-60" />
              </div>
              <p className="font-[600] leading-[1.1]">
                You {result?.status.toLowerCase() === "won" ? "Won" : "Lost"}
              </p>
              <p className="font-[600] text-[10px] opacity-60">
                {formatNumber(result?.outcome || 0)} $REDBIRD
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[20px] w-full">
        <p className="font-[500] opacity-60">Results</p>

        <div className="mt-[5px] space-y-[3px]">
          {reversedResults.length === 0 ? (
            <div>No results available.</div>
          ) : (
            reversedResults.map((result, index) => {
              if (result.bet === null) return;
              return (
                <HeadorTailResult
                  key={index}
                  i={index + 1}
                  take={result.bet}
                  spend={result.spend}
                  outcome={result.outcome}
                  status={result.status}
                  isWon={result.status.toLowerCase() === "won" ? true : false}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadorTail;
