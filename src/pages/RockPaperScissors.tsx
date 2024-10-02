import { useState } from "react";
import Slider from "../components/Slider";
import RPSResult from "../components/RPS-Result";
import paperImg from "../assets/paper.png";
import rockImg from "../assets/rock.png";
import scissorsImg from "../assets/scissors.png";
import useOwlTWAStore from "../utils/store";
import { useGetUserQuery } from "../modules/query";
import { customUserTelegramId } from "../utils/config";
import { useTelegramContext } from "../context/TelegramContext";

const MIN_SPEND = 100;

const RockPaperScissors = () => {
  const { userTelegramId } = useTelegramContext();

  const { data: userQueryData } = useGetUserQuery({
    userTelegramId: customUserTelegramId,
  });

  const { userData } = userQueryData || {};
  const { points: userPoints } = userData || {};

  console.log({ userPoints });

  const [spend, setSpend] = useState<number>(MIN_SPEND);
  const [selected, setSelected] = useState<number | null>(null);
  const [botSelected, setBotSelected] = useState<number | null>(null);

  const {
    userMoves,
    botMoves,
    botScores,
    userScores,
    spend: spendStore,
    rpsResults,
    gameCount,
    updateSpend,
    setRPSResult,
    addMove,
  } = useOwlTWAStore();
  const reversedResults = rpsResults.slice().reverse().slice(0, 10);

  console.log({ userMoves });
  console.log({ botMoves });
  console.log({ botScores });
  console.log({ userScores });
  console.log({ gameCount });
  console.log({ spend: spendStore });
  console.log({ rpsResults });

  const handleMove = () => {
    console.log({ selected, spend });
    if (selected === null || selected === undefined || !spend) return;

    updateSpend(spend);
    const possibleMoves = [0, 1, 2].filter((move) => move !== selected);
    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    setBotSelected(randomMove);
    const result = setRPSResult({
      userMove: selected,
      botMove: randomMove,
      spend,
    });
    console.log({ result });
    addMove(selected, true);
    addMove(randomMove, false);
  };

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
            {selected === null && (
              <img
                className="rotate-[40deg] w-[46px]"
                src={rockImg}
                alt="move"
              />
            )}
            {selected === 0 && (
              <img
                className="rotate-[40deg] w-[46px]"
                src={rockImg}
                alt="move"
              />
            )}
            {selected === 1 && (
              <img
                className="rotate-[40deg] w-[46px]"
                src={paperImg}
                alt="move"
              />
            )}
            {selected === 2 && (
              <img
                className="rotate-[40deg] w-[46px]"
                src={scissorsImg}
                alt="move"
              />
            )}
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
                  <span className="text-[#FDB3C3]">{userScores}</span> -{" "}
                  <span className="text-[#CD17C1]">{botScores}</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[12px]">Opponent</p>
            <p className="text-[10px] opacity-60">Scissors</p>
            {botSelected === null && (
              <img
                style={{ transform: "rotateY(180deg) rotate(90deg)" }}
                className="rotate-[-90deg] h-[46px]"
                src={rockImg}
                alt="move"
              />
            )}
            {botSelected === 0 && (
              <img
                style={{ transform: "rotateY(180deg) rotate(90deg)" }}
                className="rotate-[-90deg] h-[46px]"
                src={rockImg}
                alt="move"
              />
            )}
            {botSelected === 1 && (
              <img
                style={{ transform: "rotateY(180deg) rotate(90deg)" }}
                className="rotate-[-90deg] h-[46px]"
                src={paperImg}
                alt="move"
              />
            )}
            {botSelected === 2 && (
              <img
                style={{ transform: "rotateY(180deg) rotate(90deg)" }}
                className="rotate-[-90deg] h-[46px]"
                src={scissorsImg}
                alt="move"
              />
            )}
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
                      <img className="h-[39px]" src={rockImg} alt="Rock" />
                    </div>
                    <p className="text-[12px] text-center">Rock</p>
                  </div>
                  <div onClick={() => setSelected(1)}>
                    <div
                      className={`${
                        selected == 1 && "border"
                      } bg-[#121314] border-red rounded-[8px] w-[70px] h-[57px] grid place-items-center`}
                    >
                      <img className="h-[39px]" src={paperImg} alt="Rock" />
                    </div>
                    <p className="text-[12px] text-center">Paper</p>
                  </div>
                  <div onClick={() => setSelected(2)}>
                    <div
                      className={`${
                        selected == 2 && "border"
                      } bg-[#121314] border-red rounded-[8px] w-[70px] h-[57px] grid place-items-center`}
                    >
                      <img className="h-[39px]" src={scissorsImg} alt="Rock" />
                    </div>
                    <p className="text-[12px] text-center">Scissors</p>
                  </div>
                </div>
              </div>

              <Slider
                balance={userPoints || 100_000}
                spend={spend}
                minSpend={MIN_SPEND}
                onChange={(newSpend) => setSpend(newSpend)}
              />

              <button
                className={`${
                  selected == null ? "bg-[#534949]" : "bg-red"
                } mt-[10px] w-full h-[43px] rounded-[8px] font-[600]`}
                onClick={handleMove}
              >
                {selected == null
                  ? "Select Move"
                  : `Go (Round ${gameCount + 1}/3)`}
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
          {reversedResults.length === 0 ? (
            <div>No results available.</div>
          ) : (
            reversedResults.map((result, index) => {
              console.log({ result });
              return (
                <RPSResult
                  key={index}
                  i={index + 1}
                  userScore={result.userScore}
                  botScore={result.botScore}
                  spend={result.spend}
                  outcome={result.outcome || 0}
                  isWon={result.isWon}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
