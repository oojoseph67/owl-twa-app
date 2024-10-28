import { useEffect, useState } from "react";
import useOwlTWAStore from "../utils/store";
import { TaskListType } from "../utils";
import { useClaimRewardsMutation } from "../modules/mutation";
import { useTelegramContext } from "../context/TelegramContext";

const Task = ({
  task,
  type,
}: {
  task: TaskListType;
  type: "Task" | "Collab";
}) => {
  const claimRewardsMutation = useClaimRewardsMutation();
  const { userTelegramId } = useTelegramContext();
  const { claimedTasks, collaborationTasks, claimTask, collaborationTask } =
    useOwlTWAStore();

  const [loading, setLoading] = useState(false);

  const handleClaimTask = () => {
    if (type === "Task") {
      if (!claimedTasks.includes(task.id)) {
        console.log("inside if");
        claimTask(task.id);
        claimRewardsMutation.mutate(
          {
            points: task.points,
            userTelegramId: Number(userTelegramId),
          },
          {
            onError: () => {
              console.log("error");
            },
            onSuccess: () => {
              console.log("success");
            },
          }
        );
        setLoading(true);
      }
    } else if (type === "Collab") {
      if (!collaborationTasks.includes(task.id)) {
        collaborationTask(task.id);
        claimRewardsMutation.mutate(
          {
            points: task.points,
            userTelegramId: Number(userTelegramId),
          },
          {
            onError: () => {
              console.log("error");
            },
            onSuccess: () => {
              console.log("success");
            },
          }
        );
        setLoading(true);
      }
    }
  };

  useEffect(() => {
    if (loading) {
      const id = setTimeout(() => {
        setLoading(false);
      }, 5000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [loading]);

  return (
    <div className="task">
      <img src={task.icon} alt="media" />
      <span>
        <h6>{task.name}</h6>
        <p>{task.points} $REDBIRD</p>
      </span>
      <a
        href={task.link}
        target="_blank"
        onClick={handleClaimTask}
        className={`${
          !claimedTasks.includes(task.id) &&
          !collaborationTasks.includes(task.id)
            ? "bg-red"
            : "bg-[#121314]"
        }`}
      >
        {!claimedTasks.includes(task.id) &&
        !collaborationTasks.includes(task.id) ? (
          <div className="not-done">{task.buttonText}</div>
        ) : loading ? (
          <div className="size-[10px] rounded-full border-l border-l-white animate-spin" />
        ) : (
          <div className="done">Done</div>
        )}
      </a>
    </div>
  );
};

export default Task;
