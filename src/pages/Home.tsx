import bigbird from "../assets/bigbird.png";
import bird from "../assets/bird.png";
import hand from "../assets/hand.png";
import tonIcon from "../assets/ton.svg";
import spin from "../assets/palette.png";
import leaf from "../assets/leaf icon.png";
import bot from "../assets/chatbot.png";
import star from "../assets/glossy star.png";
import { Link } from "react-router-dom";
import { useTelegramContext } from "../context/TelegramContext";
import { useGetUserQuery } from "../modules/query";
import { useEffect } from "react";
import {
  useAddWalletAddressMutation,
  useRegisterUserMutation,
} from "../modules/mutation";
import { customUserTelegramId } from "../utils/config";
import { formatNumber, getFormatAddress } from "../utils";
import { useIsConnectionRestored, useTonConnectUI } from "@tonconnect/ui-react";

const Home = () => {
  const addWalletAddressMutation = useAddWalletAddressMutation();
  const registerUserMutation = useRegisterUserMutation();
  const { userTelegramId, userPhoto, firstName } = useTelegramContext();

  const { data: userQueryData } = useGetUserQuery({
    userTelegramId: customUserTelegramId,
  });

  const { userData } = userQueryData || {};

  const [tonConnectUI] = useTonConnectUI();
  const connectionRestored = useIsConnectionRestored();

  const account = tonConnectUI.account;

  useEffect(() => {
    if (userData && !userData.walletAddress) {
      if (account && userTelegramId) {
        addWalletAddressMutation.mutate({
          userTelegramId: Number(userTelegramId),
          walletAddress: account.address,
        });
      }
    }
  }, [account, userTelegramId, userData]);

  useEffect(() => {
    if (userQueryData) {
      if (userQueryData.status === 404 || !userQueryData) {
        const searchParams = new URLSearchParams(location.search);
        const refCode = searchParams.get("startapp");

        registerUserMutation.mutate({
          username: firstName || "Joseph",
          userTelegramId: Number(userTelegramId || customUserTelegramId),
          refTelegramId: Number(refCode),
          profilePicture: userPhoto!,
        });
      } else {
        console.log("User already registered");
      }
    }
  }, [
    userQueryData,
    location,
    firstName,
    userTelegramId,
    customUserTelegramId,
    userPhoto,
  ]);

  const handleOpen = () => {
    tonConnectUI.connectWallet();
  };

  return (
    <div className="h-full w-full relative overflow-y-auto overflow-x-hidden px-[19px]">
      <img className="absolute top-0 left-0 w-full" src={bigbird} alt="Red" />

      <div className="relative mt-[160px] bg-[#242628] w-full h-[114px] rounded-[16px] px-[10px] py-[10px] font-Inter flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <p className="font-[600] text-[16px]">
            {formatNumber(userData.points || 0)}{" "}
            <span className="text-[10px] opacity-60">$REDBIRD</span>
          </p>
          <img className="w-[41px]" src={bird} alt="bird" />
        </div>

        <button
          disabled={connectionRestored ? false : true}
          onClick={handleOpen}
          className="bg-red w-full h-[43px] rounded-[8px] flex items-center gap-[10px] justify-center"
        >
          <img src={tonIcon} alt="ton" />
          {connectionRestored ? (
            <>
              {account?.address ? (
                <p className="font-[600]">
                  Connected {getFormatAddress(account.address)}
                </p>
              ) : (
                <p className="font-[600]">Connect TON Wallet</p>
              )}
            </>
          ) : (
            <div className="border-l border-white size-[20px] rounded-full animate-spin" />
          )}
        </button>
      </div>

      <div className="relative mt-[10px] bg-[#242628] w-full h-[91px] rounded-[16px] px-[10px] py-[10px] font-Inter flex flex-col justify-between">
        <p className="font-[500] opacity-60 text-center">
          Ready to earn more $REDBIRD?
        </p>
        <Link
          to="/tasks"
          className="bg-red w-full h-[43px] rounded-[8px] flex items-center gap-[10px] justify-center"
        >
          <p className="font-[600]">Check Redable Tasks</p>
        </Link>
      </div>

      <div className="mt-[20px]">
        <p className="font-[500] opacity-60">Mini games</p>

        <div className="mt-[5px] flex justify-between gap-[10px] ">
          <Link
            to="/headortail"
            className="w-[33%] h-[114px] pt-[10px] pb-[10px] rounded-[16px] border border-red flex flex-col justify-between items-center"
          >
            <img className="size-[45px]" src={bird} alt="bird" />
            <p className="text-[12px] font-[500] text-center">Head or Tail</p>
            <button className="bg-red rounded-[4px] px-[10px] text-[10px] font-[500]">
              play
            </button>
          </Link>

          <Link
            to="/rock-paper-scissors"
            className="w-[33%] h-[114px] pt-[10px] pb-[10px] rounded-[16px] border border-red flex flex-col justify-between items-center"
          >
            <img className="h-[39px]" src={hand} alt="hand" />
            <p className="text-[12px] font-[500] text-center leading-[1.1]">
              Rock paper <br /> scissor
            </p>
            <button className="bg-red rounded-[4px] px-[10px] text-[10px] font-[500]">
              play
            </button>
          </Link>

          <div className="w-[33%] h-[114px] pt-[10px] pb-[10px] rounded-[16px] border border-red flex flex-col justify-between items-center">
            <img className="h-[39px]" src={spin} alt="spin" />
            <p className="text-[12px] font-[500] text-center">Spinning</p>
            <p className="text-red text-[12px] font-[500]">soon</p>
          </div>
        </div>
      </div>

      <div className="mt-[20px]">
        <p className="font-[500] opacity-60">Red reward</p>

        <div className="mt-[5px] w-full h-fit bg-[#242628] rounded-[16px] p-[18px] space-y-[10px]">
          <div className="flex items-center gap-[5px]">
            <img className="h-[20px]" src={leaf} alt="leaf" />
            <div>
              <p className="text-[12px] font-[500] leading-[1.1]">
                Telegram Age
              </p>
              <p className="text-[10px] opacity-60">635 $REDBIRD</p>
            </div>
          </div>

          <div className="flex items-center gap-[5px]">
            <img className="h-[20px]" src={bot} alt="bot" />
            <div>
              <p className="text-[12px] font-[500] leading-[1.1]">
                Account Activity
              </p>
              <p className="text-[10px] opacity-60">635 $REDBIRD</p>
            </div>
          </div>

          <div className="flex items-center gap-[5px]">
            <img className="h-[20px]" src={star} alt="star" />
            <div>
              <p className="text-[12px] font-[500] leading-[1.1]">
                Telegram Premium
              </p>
              <p className="text-[10px] opacity-60">635 $REDBIRD</p>
            </div>
          </div>

          <div className="flex items-center gap-[5px]">
            <img className="w-[20px]" src={bird} alt="bird" />
            <div>
              <p className="text-[12px] font-[500] leading-[1.1]">
                In your Name
              </p>
              <p className="text-[10px] opacity-60 leading-[1.1]">
                Add to your name and <br /> take your 1,000 $REDs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
