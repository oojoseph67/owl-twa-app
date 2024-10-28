import leaf from "../assets/leaf icon.png";
import bot from "../assets/chatbot.png";
import star from "../assets/glossy star.png";
import bird from "../assets/bird.png";
import { useTelegramContext } from "../context/TelegramContext";
import { useEffect, useState } from "react";
import RewardItem from "./RewardItem";
import { useClaimRewardsMutation } from "../modules/mutation";

const task1Points = 635;
const task2Points = 635;
const task3Points = 635;
const task4Points = 1000;

const RedRewards = () => {
  const tg = window.Telegram;
  const { firstName, userTelegramId } = useTelegramContext();
  const isPremium = tg.WebApp.initDataUnsafe?.user?.is_premium;

  const claimRewardsMutation = useClaimRewardsMutation();

  const getStoredTaskState = (key: string) => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null || storedValue === "undefined") {
      return false;
    }
    return JSON.parse(storedValue);
  };

  const [task1, setTask1] = useState<boolean>(() =>
    getStoredTaskState("task1v")
  );
  const [task2, setTask2] = useState<boolean>(() =>
    getStoredTaskState("task2v")
  );
  const [task3, setTask3] = useState<boolean>(() =>
    getStoredTaskState("task3v")
  );
  const [task4, setTask4] = useState<boolean>(() =>
    getStoredTaskState("task4v")
  );

  const checkTask1 = () => setTask1(true);
  const checkTask2 = () => setTask2(true);
  const checkTask3 = () => setTask3(isPremium);
  const checkTask4 = () => setTask4(firstName.includes("$REDBIRD"));

  useEffect(() => {
    checkTask1();
    checkTask2();
    checkTask3();
    checkTask4();

    const id = setInterval(() => {
      checkTask1();
      checkTask2();
      checkTask3();
      checkTask4();
    }, 10000);

    return () => clearInterval(id);
  }, [firstName, isPremium]);

  // Save task status to localStorage
  const saveToLocalStorage = (key: string, value: boolean) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    saveToLocalStorage("task1v", task1);
    saveToLocalStorage("task2v", task2);
    saveToLocalStorage("task3v", task3);
    saveToLocalStorage("task4v", task4);
  }, [task1, task2, task3, task4]);

  useEffect(() => {
    const hasClaimedTask1 = localStorage.getItem("hasClaimedTask1v") === "true";
    const hasClaimedTask2 = localStorage.getItem("hasClaimedTask2v") === "true";
    const hasClaimedTask3 = localStorage.getItem("hasClaimedTask3v") === "true";
    const hasClaimedTask4 = localStorage.getItem("hasClaimedTask4v") === "true";

    if (task1 && !hasClaimedTask1) {
      claimRewardsMutation.mutate({
        points: task1Points,
        userTelegramId: Number(userTelegramId),
      });
      localStorage.setItem("hasClaimedTask1v", "true");
    }

    if (task2 && !hasClaimedTask2) {
      claimRewardsMutation.mutate({
        points: task2Points,
        userTelegramId: Number(userTelegramId),
      });
      localStorage.setItem("hasClaimedTask2v", "true");
    }

    if (task3 && !hasClaimedTask3) {
      claimRewardsMutation.mutate({
        points: task3Points,
        userTelegramId: Number(userTelegramId),
      });
      localStorage.setItem("hasClaimedTask3v", "true");
    }

    if (task4 && !hasClaimedTask4) {
      claimRewardsMutation.mutate({
        points: task4Points,
        userTelegramId: Number(userTelegramId),
      });
      localStorage.setItem("hasClaimedTask4v", "true");
    }
  }, [task1, task2, task3, task4, userTelegramId]);

  return (
    <div className="mt-[20px]">
      <p className="font-[500] opacity-60">Red reward</p>

      <div className="red-rewards">
        <RewardItem
          icon={leaf}
          title="Telegram Age"
          description="635 $REDBIRD"
          taskCompleted={task1}
        />
        <RewardItem
          icon={bot}
          title="Account Activity"
          description="635 $REDBIRD"
          taskCompleted={task2}
        />
        <RewardItem
          icon={star}
          title="Telegram Premium"
          description="635 $REDBIRD"
          taskCompleted={task3}
        />
        <RewardItem
          icon={bird}
          title="$REDBIRD in your Name"
          description="Add $REDBIRD to your name and take your 1,000 $REDS"
          taskCompleted={task4}
        />
      </div>
    </div>
  );
};

export default RedRewards;
