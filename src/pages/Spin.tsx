import bird from "../assets/birdBW.png";
import spinImg from "../assets/spin.png";
import arrow from "../assets/arrow.svg";
import Slider from "../components/Slider";
import { useState } from "react";
import { useTelegramContext } from "../context/TelegramContext";
import { useGetUserQuery } from "../modules/query";
import SpinResult from "../components/Spin-Result";

const MIN_SPEND = 100;

const Spin = () => {
  const { userTelegramId } = useTelegramContext();

  const { data: userQueryData } = useGetUserQuery({
    userTelegramId: userTelegramId,
  });
  const { userData } = userQueryData || {};
  const { points: userPoints } = userData || {};

  const [spend, setSpend] = useState<number>(MIN_SPEND);

  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rewardEarned, setRewardEarned] = useState(0);

  const handleWheelSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const rewardId = Math.floor(Math.random() * 6);
    setRewardEarned(rewardId);

    const sectorAngle = rewardId * 60;

    const backToZeroDeg = 600 - rewardEarned * 60;
    const baseRotation = 720;
    const finalRotation = baseRotation + sectorAngle + backToZeroDeg;

    setRotation(rotation + finalRotation);
  };

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
          {true ? (
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
                onClick={handleWheelSpin}
                className="mt-[20px] w-full h-[43px] bg-red rounded-[8px] font-[600]"
              >
                Spin
              </button>
            </div>
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
              <p className="font-[600] text-[10px] opacity-60">500 $REDBIRD</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[20px] w-full">
        <p className="font-[500] opacity-60">Results</p>

        <div className="mt-[5px] space-y-[3px]">
          <SpinResult
            key={0}
            i={1}
            take={"2.5x"}
            spend={150}
            outcome={375}
            isWon={true}
          />
          <SpinResult
            key={1}
            i={2}
            take={"0.0x"}
            spend={150}
            outcome={150}
            isWon={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Spin;
