import leaf from "../assets/leaf icon.png";
import bot from "../assets/chatbot.png";
import star from "../assets/glossy star.png";
import bird from "../assets/bird.png";
import { useTelegramContext } from "../context/TelegramContext";
import { useEffect, useState } from "react";
import RewardItem from "./RewardItem";

const RedRewards = () => {
  const tg = window.Telegram;
  const { firstName } = useTelegramContext();
  const isPremium = tg.WebApp.initDataUnsafe?.user?.is_premium;

  const getStoredTaskState = (key: string) => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null || storedValue === "undefined") {
      return false;
    }
    return JSON.parse(storedValue);
  };

  const [task1, setTask1] = useState<boolean>(() =>
    getStoredTaskState("task1")
  );
  const [task2, setTask2] = useState<boolean>(() =>
    getStoredTaskState("task2")
  );
  const [task3, setTask3] = useState<boolean>(() =>
    getStoredTaskState("task3")
  );
  const [task4, setTask4] = useState<boolean>(() =>
    getStoredTaskState("task4")
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
    saveToLocalStorage("task1", task1);
    saveToLocalStorage("task2", task2);
    saveToLocalStorage("task3", task3);
    saveToLocalStorage("task4", task4);
  }, [task1, task2, task3, task4]);

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
