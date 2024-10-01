import bird from "../assets/bird2.png";
import { IoCopy as Copy } from "react-icons/io5";
import { TbCopyCheckFilled as Copied } from "react-icons/tb";
import inviteIcon from "../assets/invte.svg";

const Referral = () => {
  return (
    <div className="rankings h-full w-full relative overflow-y-auto overflow-x-hidden px-[19px] pt-[20px] flex flex-col justify-between">
      <h1 className="text-[32px] font-[600] text-center leading-[1.1]">
        $REDBIRD for one and one for $REDBIRD
      </h1>
      <div className="flex-1">
        <img className="mt-[20px] w-[222px] mx-auto" src={bird} alt="bird" />
      </div>

      <div>
        <p className="font-[500] opacity-60 text-center text-[14px]">
          Invite friends and earn 200$REDBIRD for it
        </p>

        <div className="mt-[20px] flex justify-between gap-[20px] ">
          <button className="h-[59px] flex gap-[10px] justify-center items-center rounded-[16px] bg-[red] flex-1 text-[20px] font-[600] ">
            Invite friend <img src={inviteIcon} alt="invit" />
          </button>
          <button className="w-[77px] h-[59px] rounded-[16px] bg-red grid place-items-center text-[34px]">
            {true ? <Copy /> : <Copied />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Referral;
