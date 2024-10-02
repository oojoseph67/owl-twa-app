import { create } from "zustand";

interface OwlTWAStore {
  points: number;
  addPoints: (points: number) => void;
}

const loadState = () => {
  const points = parseInt(localStorage.getItem("points") || "0");
  return { points };
};

const saveState = ({ points }: { points: number }) => {
  localStorage.setItem("points", points.toString());
};

const initialState = loadState();

const useOwlTWAStore = create<OwlTWAStore>((set) => ({
  points: initialState.points,
  addPoints(points) {
    set((state) => {
      const newPoints = state.points + points;
      saveState({ points: newPoints });
      return { points: newPoints };
    });
  },
}));

export default useOwlTWAStore;
