import bird from "../assets/bird.png";
import ytLogo from "../assets/ytLogo.png";
import twLogo from "../assets/twLogo.png";
import igLogo from "../assets/igLogo.png";
import tgLogo from "../assets/tgLogo.png";

const Tasks = () => {
  return (
    <div className="tasks h-full w-full relative overflow-y-auto overflow-x-hidden px-[19px] py-[20px]">
      <h1 className="text-[32px] font-[600] text-center leading-[1.1]">
        $REDBIRD in one place
      </h1>

      <div className="mt-[40px]">
        <div className="flex items-center gap-[4px]">
          <p className="font-[500] opacity-60">We are $REDBIRD Here</p>
          <span className="flex">
            <img className="w-[22px]" src={bird} alt="bird" />
            <img className="w-[22px]" src={bird} alt="bird" />
            <img className="w-[22px]" src={bird} alt="bird" />
            <img className="w-[22px]" src={bird} alt="bird" />
          </span>
        </div>
        <div className="mt-[5px] w-full rounded-[16px] bg-[#242628] px-[10px] py-[18px] space-y-[10px]">
          <div className="task">
            <img src={ytLogo} alt="media" />
            <span>
              <h6>Watch video on YouTube.</h6>
              <p>635 $REDBIRD</p>
            </span>
            {false ? (
              <button className="done">Done</button>
            ) : (
              <button className="not-done">Go</button>
            )}
          </div>

          <div className="task">
            <img src={tgLogo} alt="media" />
            <span>
              <h6>Join $REDBIRD TG Channel</h6>
              <p>635 $REDBIRD</p>
            </span>
            {false ? (
              <button className="done">Done</button>
            ) : (
              <button className="not-done">Join</button>
            )}
          </div>

          <div className="task">
            <img src={twLogo} alt="media" />
            <span>
              <h6>Follow $REDBIRD on X</h6>
              <p>635 $REDBIRD</p>
            </span>
            {false ? (
              <button className="done">Done</button>
            ) : (
              <button className="not-done">Go</button>
            )}
          </div>

          <div className="task">
            <img src={igLogo} alt="media" />
            <span>
              <h6>Follow $REDBIRD on Instagram</h6>
              <p>635 $REDBIRD</p>
            </span>
            {false ? (
              <button className="done">Done</button>
            ) : (
              <button className="not-done">Follow</button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-[15px]">
        <div className="">
          <p className="font-[500] opacity-60">Collaboration</p>
        </div>
        <div className="mt-[5px] w-full rounded-[16px] bg-[#242628] px-[10px] py-[18px] space-y-[10px]">
          <div className="task">
            <img src={ytLogo} alt="media" />
            <span>
              <h6>Play Hamster</h6>
              <p>635 $REDBIRD</p>
            </span>
            {false ? (
              <button className="done">Done</button>
            ) : (
              <button className="not-done">Go</button>
            )}
          </div>

          <div className="task">
            <img src={tgLogo} alt="media" />
            <span>
              <h6>Play Simple Coin</h6>
              <p>635 $REDBIRD</p>
            </span>
            {false ? (
              <button className="done">Done</button>
            ) : (
              <button className="not-done">Join</button>
            )}
          </div>

          <div className="task">
            <img src={twLogo} alt="media" />
            <span>
              <h6>Follow CEX.IO on X</h6>
              <p>635 $REDBIRD</p>
            </span>
            {false ? (
              <button className="done">Done</button>
            ) : (
              <button className="not-done">Go</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
