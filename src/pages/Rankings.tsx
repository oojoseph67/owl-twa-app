import Rank from "../components/Rank";
import { useTelegramContext } from "../context/TelegramContext";
import { useGetLeaderboardQuery, UserInterface } from "../modules/query";
import { customUserTelegramId } from "../utils/config";

const Rankings = () => {
  const { userTelegramId } = useTelegramContext();
  const { data: leaderboardData } = useGetLeaderboardQuery();

  return (
    <div className="rankings h-full w-full relative overflow-y-auto overflow-x-hidden px-[19px] py-[20px]">
      <h1 className="text-[32px] font-[600] text-center leading-[1.1]">
        Leader Board
      </h1>

      <div className="mt-[40px] bg-[#242628] rounded-[16px] w-full py-[20px] px-[15px] space-y-[20px]">
        {leaderboardData &&
          leaderboardData.map((leaderboard: UserInterface, index: number) => (
            <Rank
              key={index}
              position={index + 1}
              userTelegramId={userTelegramId || customUserTelegramId}
              leaderboard={leaderboard}
            />
          ))}
      </div>
    </div>
  );
};

export default Rankings;
