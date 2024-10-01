import Rank from "../components/Rank";

const Rankings = () => {
  return (
    <div className="rankings h-full w-full relative overflow-y-auto overflow-x-hidden px-[19px] py-[20px]">
      <h1 className="text-[32px] font-[600] text-center leading-[1.1]">
        Leader Board
      </h1>

      <div className="mt-[40px] bg-[#242628] rounded-[16px] w-full py-[20px] px-[15px] space-y-[20px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <Rank key={i} position={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default Rankings;
