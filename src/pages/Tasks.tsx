import { useEffect } from "react";
import bird from "../assets/bird.png";
import Task from "../components/Task";
import { CollaborationList, TaskList } from "../utils";
import useOwlTWAStore from "../utils/store";

const Tasks = () => {
  const { claimedTasks, collaborationTasks, claimTask, collaborationTask } =
    useOwlTWAStore();

  //Show Back Button
  useEffect(() => {
    const tg = window.Telegram.WebApp;

    tg.BackButton.show();

    tg.BackButton.onClick(() => {
      window.history.back();
    });

    return () => {
      tg.BackButton.hide();
    };
  }, []);

  const handleClaimTask = (taskId: string) => {
    if (!claimedTasks.includes(taskId)) {
      claimTask(taskId);
    }
  };

  const handleCollaborationTask = (taskId: string) => {
    if (!collaborationTasks.includes(taskId)) {
      collaborationTask(taskId);
    }
  };

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

        <div className="mt-[5px] w-full rounded-[16px] bg-[#242628] px-[10px] py-[18px] space-y-[20px]">
          {TaskList.map((task, i) => {
            return <Task task={task} type="Task" key={i} />;
          })}
        </div>
      </div>

      <div className="mt-[15px]">
        <div className="">
          <p className="font-[500] opacity-60">Collaboration</p>
        </div>
        <div className="mt-[5px] w-full rounded-[16px] bg-[#242628] px-[10px] py-[18px] space-y-[20px]">
          {CollaborationList.map((task, i) => {
            return <Task task={task} type="Collab" key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
