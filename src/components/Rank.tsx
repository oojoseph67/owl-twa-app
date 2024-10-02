import bird from "../assets/bird.png";
import first from "../assets/first.png";
import second from "../assets/second.png";
import third from "../assets/third.png";

const Rank = ({ position }: { position: number }) => {
  return (
    <div className="rank">
      <img className="w-[29.75px]" src={bird} alt="media" />
      <span>
        <h6>Lemmyux</h6>
        <p>
          <span className="opacity-60">66,235,834</span> $REDBIRD
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
