import { useState } from "react";
import Slider from "../components/Slider";
import RPSResult from "../components/RPS-Result";
import paperImg from "../assets/paper.png";
import rockImg from "../assets/rockImg.png";
import scissorsImg from "../assets/scissors.png";

const MIN_SPEND = 100;

const RockPaperScissors = () => {
  const [balance, setBalance] = useState<number>(2142);
  const [spend, setSpend] = useState<number>(MIN_SPEND);

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="h-full w-full relative overflow-y-auto overflow-x-hidden px-[19px] py-[20px]">
      <h1 className="text-[32px] font-[600] text-center">
        Rock-paper-scissors
      </h1>

      <div className="mt-[20px] bg-[#242628] w-full h-[380px] rounded-[16px] px-[20px] py-[20px] flex flex-col items-center">
        {/* Result Display */}
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col items-center">
            <p className="text-[12px]">Your move</p>
            <p className="text-[10px] opacity-60">Rock</p>
            <img className="rotate-[40deg] w-[46px]" src={rockImg} alt="move" />
          </div>

          <div>
            {false ? (
              <div>
                <p className="text-[12px] font-[600] text-center leading-[1.0]">
                  Choose a <br /> move
                </p>
                <p className="text-[12px] font-[600] text-center text-red">
                  Start
                </p>
              </div>
            ) : (
              <div>
                <p className="text-[12px] font-[600] text-center">Score</p>
                <p
                  className={`flex items-center justify-center gap-[3px]  font-[600] text-[12px]`}
                >
                  <span className="text-[#FDB3C3]">1</span> -{" "}
                  <span className="text-[#CD17C1]">0</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[12px]">Opponent</p>
            <p className="text-[10px] opacity-60">Scissors</p>
            <img
              style={{ transform: "rotateY(180deg) rotate(90deg)" }}
              className="rotate-[-90deg] w-[46px]"
              src={scissorsImg}
              alt="move"
            />
          </div>
        </div>

        <div className="w-full mt-[20px]">
          {true ? (
            <>
              {/* Select Choice */}
              <div className="w-full">
                <p className="text-[12px] font-Inter text-center">
                  Choose the next move
                </p>

                <div className="mt-[10px] flex gap-[10px] justify-center">
                  <div onClick={() => setSelected(0)}>
                    <div
                      className={`${
                        selected == 0 && "border"
                      } bg-[#121314] border-red rounded-[8px] w-[70px] h-[57px] grid place-items-center`}
                    >
                      <img src={rockImg} alt="Rock" />
                    </div>
                    <p className="text-[12px] text-center">Rock</p>
                  </div>
                  <div onClick={() => setSelected(1)}>
                    <div
                      className={`${
                        selected == 1 && "border"
                      } bg-[#121314] border-red rounded-[8px] w-[70px] h-[57px] grid place-items-center`}
                    >
                      <img src={paperImg} alt="Rock" />
                    </div>
                    <p className="text-[12px] text-center">Paper</p>
                  </div>
                  <div onClick={() => setSelected(2)}>
                    <div
                      className={`${
                        selected == 2 && "border"
                      } bg-[#121314] border-red rounded-[8px] w-[70px] h-[57px] grid place-items-center`}
                    >
                      <img src={scissorsImg} alt="Rock" />
                    </div>
                    <p className="text-[12px] text-center">Scissors</p>
                  </div>
                </div>
              </div>

              <Slider
                balance={balance}
                spend={spend}
                minSpend={MIN_SPEND}
                onChange={(newSpend) => setSpend(newSpend)}
              />

              <button
                className={`${
                  selected == null ? "bg-[#534949]" : "bg-red"
                } mt-[10px] w-full h-[43px] rounded-[8px] font-[600]`}
              >
                {selected == null ? "Select Move" : "Go (Round 1/3)"}
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
          <RPSResult
            i="1"
            userScore={2}
            botScore={1}
            spend={150}
            outcome={300}
            isWon={true}
          />
          <RPSResult
            i="2"
            userScore={0}
            botScore={2}
            spend={500}
            outcome={500}
            isWon={false}
          />
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
