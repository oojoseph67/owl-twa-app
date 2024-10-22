import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Referral from "./pages/Referral";
import Rankings from "./pages/Rankings";
import HeadorTail from "./pages/HeadorTail";
import RockPaperScissors from "./pages/RockPaperScissors";
import Spin from "./pages/Spin";

function App() {
  return (
    <div
      className="mini-app relative max-w-[430px] h-screen mx-auto text-white rounded-t-[32px] overflow-hidden"
      style={{ backgroundColor: "black" }}
    >
      <div style={{ height: "calc(100vh - 92px)" }} className="font-Inter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/headortail" element={<HeadorTail />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
          <Route path="/spin" element={<Spin />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/ranking" element={<Rankings />} />
          <Route path="/referral" element={<Referral />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
