import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  RankingIcon,
  ReferralIcon,
  TaskIcon,
} from "../assets/CustomIcons";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="fixed bottom-0 h-[92px] w-full max-w-[430px] flex items-center justify-between px-[30px]">
      <NavLink to="/">
        <div className="h-[24px]">
          <HomeIcon active={path == "/"} />
        </div>
        <p>Home</p>
      </NavLink>

      <NavLink to="/tasks">
        <div className="h-[24px]">
          <TaskIcon active={path == "/tasks"} />
        </div>
        <p>Tasks</p>
      </NavLink>

      <NavLink to="/ranking">
        <div className="h-[24px]">
          <RankingIcon active={path == "/ranking"} />
        </div>
        <p>Ranking</p>
      </NavLink>

      <NavLink to="/referral">
        <div className="h-[24px]">
          <ReferralIcon active={path == "/referral"} />
        </div>
        <p>Referral</p>
      </NavLink>
    </nav>
  );
};

export default Navbar;
