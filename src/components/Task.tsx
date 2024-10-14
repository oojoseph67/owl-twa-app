import React, { useEffect, useState } from "react";
import useOwlTWAStore from "../utils/store";
import { TaskListType } from "../utils";

const Task = ({
  task,
  type,
}: {
  task: TaskListType;
  type: "Task" | "Collab";
}) => {
  const { claimedTasks, collaborationTasks, claimTask, collaborationTask } =
    useOwlTWAStore();

  const [loading, setLoading] = useState(false);

  const handleClaimTask = (taskId: string) => {
    if (!claimedTasks.includes(taskId)) {
      claimTask(taskId);
      setLoading(true);
    }
  };

  const handleCollaborationTask = (taskId: string) => {
    if (!collaborationTasks.includes(taskId)) {
      collaborationTask(taskId);
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
    <a href={task.link} target="_blank" className="task">
      <img src={task.icon} alt="media" />
      <span>
        <h6>{task.name}</h6>
        <p>{task.points} $REDBIRD</p>
      </span>
      <button
        disabled={claimedTasks.includes(task.id)}
        onClick={() => handleClaimTask(task.id)}
        className="bg-red disabled:bg-[#121314]"
      >
        {!claimedTasks.includes(task.id) ? (
          <div className="not-done">{task.buttonText}</div>
        ) : loading ? (
          <div className="size-[10px] rounded-full border-l border-l-white animate-spin" />
        ) : (
          <div className="done">Done</div>
        )}
      </button>
    </a>
  );
};

export default Task;
