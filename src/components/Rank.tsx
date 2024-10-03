import bird from "../assets/bird.png";
import first from "../assets/first.png";
import second from "../assets/second.png";
import third from "../assets/third.png";
import { UserInterface } from "../modules/query";
import { formatNumber } from "../utils";

const Rank = ({
  position,
  userTelegramId,
  leaderboard,
}: {
  position: number;
  userTelegramId: number | string;
  leaderboard: UserInterface;
}) => {
  return (
    <div className="rank">
      <img className="w-[29.75px]" src={bird} alt="media" />
      <span>
        <h6>
          {leaderboard.username}{" "}
          {Number(leaderboard.telegramId) === Number(userTelegramId) ? (
            <span className="text-sm opacity-60">You</span>
          ) : (
            " "
          )}
        </h6>
        <p>
          <span className="opacity-60">
            {formatNumber(leaderboard.points)} $REDBIRD
          </span>
        </p>
      </span>
      {position < 4 ? (
        <>
          {position == 1 && (
            <img className="h-[30px]" src={first} alt="first" />
          )}
          {position == 2 && (
            <img className="h-[30px]" src={second} alt="second" />
          )}
          {position == 3 && (
            <img className="h-[30px]" src={third} alt="third" />
          )}
        </>
      ) : (
        <p className="text-[14px] font-[600] opacity-60">#{position}</p>
      )}
    </div>
  );
};

export default Rank;
