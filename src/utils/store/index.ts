import { create } from "zustand";

export type Result = {
  bet: "Head" | "Tail";
  spend: number;
  outcome: number;
  status: string;
};

interface OwlTWAStore {
  points: number;
  results: Result[];
  addPoints: (points: number) => void;
  addResult: (result: any) => void;
  setHeadOrTailResult: ({
    selectedBet,
    spend,
  }: {
    selectedBet: string;
    spend: number;
  }) => Result | null;
}

const loadState = () => {
  const points = parseInt(localStorage.getItem("points") || "0");
  const results = JSON.parse(localStorage.getItem("results-v2") || "[]");
  return { points, results };
};

const saveState = ({ points, results }: { points: number; results: any[] }) => {
  localStorage.setItem("points", points.toString());
  localStorage.setItem("results-v2", JSON.stringify(results));
};

const initialState = loadState();

const useOwlTWAStore = create<OwlTWAStore>((set) => ({
  points: initialState.points,
  results: initialState.results,
  addPoints(points) {
    set((state) => {
      const newPoints = state.points + points;
      saveState({ points: newPoints, results: state.results });
      return { points: newPoints };
    });
  },
  addResult(result) {
    set((state) => {
      const newResults = [...state.results, result];
      saveState({ points: state.points, results: newResults });
      return { results: newResults };
    });
  },
  setHeadOrTailResult({
    selectedBet,
    spend,
  }: {
    selectedBet: string;
    spend: number;
  }): Result | null {
    if (selectedBet) {
      const win = Math.random() < 0.4; // 40% chance to win
      const outcome = win ? spend * 2 : 0;

      return (
        {
          spend,
          bet: selectedBet as "Head" | "Tail",
          outcome,
          status: win ? "won" : "lost",
        } || null
      );
      //   return {
      //     ...state,
      //     selectedBet,
      //     outcome,
      //     winStatus: win ? "win" : "lose",
      //   };
    }

    return null;
  },
}));

export default useOwlTWAStore;
