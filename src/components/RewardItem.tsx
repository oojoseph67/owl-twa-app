import { HiBadgeCheck as CheckedIcon } from "react-icons/hi";

type RewardItemProps = {
  icon: string;
  title: string;
  description: string;
  taskCompleted: boolean;
};

const RewardItem = ({
  icon,
  title,
  description,
  taskCompleted,
}: RewardItemProps) => {
  return (
    <div className="reward-item">
      <img className="w-[20px]" src={icon} alt={title} />
      <div>
        <p className="main">{title}</p>
        <p className="sec max-w-[60%]">{description}</p>
      </div>
      {taskCompleted && <span>{<CheckedIcon />}</span>}
    </div>
  );
};

export default RewardItem;
