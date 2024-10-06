import ytLogo from "../assets/ytLogo.png";
import twLogo from "../assets/twLogo.png";
import igLogo from "../assets/igLogo.png";
import tgLogo from "../assets/tgLogo.png";

export function getFormatAddress(address: string): string {
  const start = address?.slice(0, 4);
  const end = address?.slice(-4);
  return `${start}...${end}`;
}

export function formatNumber(num: number | string): string {
  const absNum = Math.abs(Number(num));

  if (absNum >= 1000000000) {
    return (Number(num) / 1000000000).toFixed(3) + "B";
  } else if (absNum >= 1000000) {
    return (Number(num) / 1000000).toFixed(3) + "M";
  } else if (absNum >= 1000) {
    return (Number(num) / 1000).toFixed(3) + "K";
  } else {
    return Number(num).toFixed(3);
  }
}

type TaskListType = {
  id: string;
  points: number;
  link: string;
  name: string;
  icon: any;
  buttonText: string;
};

export const TaskList: TaskListType[] = [
  {
    id: "youtube_watch",
    points: 635,
    link: "https://t.me/apeuniverse_official",
    name: "Watch video on YouTube",
    icon: ytLogo,
    buttonText: "Go",
  },
  {
    id: "tg_join",
    points: 635,
    link: "https://x.com/ApeUniverse_1",
    name: "Join $REDBIRD TG Channel",
    icon: tgLogo,
    buttonText: "Go",
  },
  {
    id: "twitter_follow",
    points: 635,
    link: "https://www.youtube.com/@ApeUniverse",
    name: "Follow $REDBIRD on Twitter",
    icon: twLogo,
    buttonText: "Go",
  },
  {
    id: "instagram_follow",
    points: 635,
    link: "https://www.instagram.com/apeuniverse_official",
    name: "Follow $REDBIRD on Instagram",
    icon: igLogo,
    buttonText: "Go",
  },
];

export const CollaborationList: TaskListType[] = [
  {
    id: "youtube_watch_collab",
    points: 635,
    link: "https://t.me/apeuniverse_official",
    name: "Play Hamster",
    icon: ytLogo,
    buttonText: "Go",
  },
  {
    id: "tg_join_collab",
    points: 635,
    link: "https://x.com/ApeUniverse_1",
    name: "Play Simple Coin",
    icon: tgLogo,
    buttonText: "Join",
  },
  {
    id: "twitter_follow_collab",
    points: 635,
    link: "https://www.youtube.com/@ApeUniverse",
    name: "Follow CEX.IO on X",
    icon: twLogo,
    buttonText: "Go",
  },
];
