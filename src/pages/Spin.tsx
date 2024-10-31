import bird from "../assets/birdBW.png";
import spinImg from "../assets/spin.png";
import arrow from "../assets/arrow.svg";
import Slider from "../components/Slider";
import { useEffect, useState } from "react";
import { useTelegramContext } from "../context/TelegramContext";
import { useGetUserQuery } from "../modules/query";
import {
  useClaimRewardsMutation,
  usePurchaseUsingPointsMutation,
} from "../modules/mutation";
import useOwlTWAStore, { SpinResult as SpinResultType } from "../utils/store";
import SpinResult, { TakeType } from "../components/Spin-Result";

const MIN_SPEND = 100;

const Spin = () => {
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

  const purchaseUsingPointsMutation = usePurchaseUsingPointsMutation();
  const claimRewardsMutation = useClaimRewardsMutation();

  const { userTelegramId } = useTelegramContext();

  const { data: userQueryData } = useGetUserQuery({
    userTelegramId: userTelegramId,
  });
  const { userData } = userQueryData || {};
  const { points: userPoints } = userData || {};

  const canPlay = userPoints && userPoints >= MIN_SPEND;

  const [spend, setSpend] = useState<number>(MIN_SPEND);

  const {
    spinResults,
    currentSpinResult,
    spin,
    addSpinResult,
    setCurrentSpinResult,
  } = useOwlTWAStore();
  const reversedResults = spinResults.slice().reverse().slice(0, 20);

  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rewardEarned, setRewardEarned] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const handlePurchase = async () => {
    if (!spend) return;

    const rewardId = Math.floor(Math.random() * 6);

    purchaseUsingPointsMutation.mutate(
      {
        points: Number(spend),
        userTelegramId: Number(userTelegramId),
      },
      {
        onSuccess(data, variables, context) {
          if (isSpinning) return;
          setIsSpinning(true);
          setRewardEarned(rewardId);

          const sectorAngle = rewardId * 60;
          const backToZeroDeg = 360 - rewardEarned * 60;
          const baseRotation = 720;
          const finalRotation = baseRotation + sectorAngle + backToZeroDeg;

          setRotation(rotation + finalRotation);

          const spinResult = spin({ rewardIndex: rewardId, spend: spend });
          console.log({ spinResult });

          // @ts-ignore
          addSpinResult(spinResult as SpinResultType);

          // Delay showing the result until after the animation
          setTimeout(() => {
            // @ts-ignore
            if (spinResult?.outcome > 0) {
              claimRewardsMutation.mutate({
                // @ts-ignore
                points: Number(spinResult?.outcome),
                userTelegramId: Number(userTelegramId),
              });
            }
            setShowResult(true); // Show the spin result after the spin animation
          }, 2100); // Adjust this duration if needed

          setIsSpinning(false);
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

  useEffect(() => {
    if (currentSpinResult && !isSpinning) {
      const timer = setTimeout(() => {
        setSpend(MIN_SPEND);
        setCurrentSpinResult();
        setShowResult(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentSpinResult]);

  return (
    <div className="h-full w-full relative overflow-y-auto overflow-x-hidden px-[19px] py-[20px]">
      <h1 className="text-[32px] font-[600] text-center">Hoot Spin</h1>

      <div className="mt-[20px] bg-[#242628] w-full h-[459px] rounded-[16px] px-[20px] py-[20px] flex flex-col items-center">
        <div className="relative w-[213px] h-[213px]">
          <img
            className="absolute h-full w-full top-0 left-[2.7%]"
            src={bird}
            alt="bird"
          />
          <img
            onTransitionEnd={() => {
              setIsSpinning(false);
            }}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 2s ease-out",
            }}
            className="absolute h-full w-full top-0 left-0"
            src={spinImg}
            alt="spin"
          />
          <img
            className="absolute left-1/2 -translate-x-1/2 top-[25px]"
            src={arrow}
            alt="arrow"
          />
        </div>

        <div className="w-full mt-[40px]">
          {!showResult ? (
            <div className="w-full">
              <div className="mb-[2px] w-full flex gap-[5px]">
                <div className="spin-reward-display bg-[#329FF9]">0.0x</div>
                <div className="spin-reward-display bg-[#19D852]">1.2x</div>
                <div className="spin-reward-display bg-[#FFBD29]">1.7x</div>
                <div className="spin-reward-display bg-[#FC3DD8]">2.5x</div>
              </div>
              <Slider
                balance={userPoints || 0}
                spend={spend}
                minSpend={MIN_SPEND}
                onChange={(newSpend) => setSpend(newSpend)}
              />
              <button
                onClick={handlePurchase}
                disabled={purchaseUsingPointsMutation.isLoading || !canPlay}
                className="mt-[20px] w-full h-[43px] bg-red rounded-[8px] font-[600]"
              >
                {canPlay ? "Spin" : "Insufficient Balance"}
              </button>
            </div>
          ) : (
            <div
              className={`${
                currentSpinResult?.bet !== "0.0x"
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
                You {currentSpinResult?.outcome! > 0 ? "Won" : "Lost"}
              </p>
              <p className="font-[600] text-[10px] opacity-60">
                {currentSpinResult?.outcome} $REDBIRD
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
              const isWon = result.outcome > 0;

              return (
                <SpinResult
                  key={index}
                  position={index + 1}
                  take={result.bet as TakeType}
                  spend={result.spend}
                  outcome={result.outcome}
                  isWon={isWon}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Spin;
