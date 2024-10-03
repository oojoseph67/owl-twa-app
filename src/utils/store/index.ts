import { create } from "zustand";

export type Result = {
  bet: "Head" | "Tail";
  spend: number;
  outcome: number;
  status: string;
};

export type RPSResult = {
  userScore: number;
  botScore: number;
  spend: number;
  outcome?: number;
  isWon: boolean;
};

interface OwlTWAStore {
  points: number;
  hotResults: Result[];
  rpsResults: RPSResult[];
  userMoves: number[];
  botMoves: number[];
  userScores: number;
  botScores: number;
  gameCount: number;
  spend: number;
  currentRPSResult: RPSResult | null;
  purchased: boolean;
  setCurrentRPSResult: () => void;
  updatePurchased: (purchased: boolean) => void;
  updateSpend: (spend: number) => void;
  addPoints: (points: number) => void;
  addHOTResult: (result: any) => void;
  setHeadOrTailResult: ({
    selectedBet,
    spend,
  }: {
    selectedBet: string;
    spend: number;
  }) => Result | null;
  addRPSResult: () => void;
  setRPSResult: ({
    userMove,
    botMove,
    spend,
  }: {
    userMove: number;
    botMove: number;
    spend: number;
  }) => RPSResult | null;
  resetRPS: () => void;
  resetMove: () => void;
  addMove: (move: number, isUserMove: boolean) => void;
}

const loadState = () => {
  const points = parseInt(localStorage.getItem("points") || "0");
  const hotResults = JSON.parse(localStorage.getItem("hotResults") || "[]");
  const rpsResults = JSON.parse(localStorage.getItem("rpsResultsV3") || "[]");
  return { points, hotResults, rpsResults };
};

const saveState = ({
  points,
  hotResults,
  rpsResults,
}: {
  points: number;
  hotResults: Result[];
  rpsResults: RPSResult[];
}) => {
  localStorage.setItem("points", points.toString());
  localStorage.setItem("hotResults", JSON.stringify(hotResults));
  localStorage.setItem("rpsResultsV3", JSON.stringify(rpsResults));
};

const initialState = loadState();

const useOwlTWAStore = create<OwlTWAStore>((set) => ({
  points: initialState.points,
  hotResults: initialState.hotResults,
  rpsResults: initialState.rpsResults,
  userMoves: [],
  botMoves: [],
  userScores: 0,
  botScores: 0,
  gameCount: 0,
  spend: 0,
  currentRPSResult: null,
  purchased: false,
  setCurrentRPSResult() {
    set((state) => {
      return { currentRPSResult: null };
    });
  },
  updatePurchased(purchased: boolean) {
    set((state) => {
      return { purchased };
    });
  },
  updateSpend(spend: number) {
    set((state) => {
      return { spend };
    });
  },
  addPoints(points: number) {
    set((state) => {
      const newPoints = state.points + points;
      saveState({
        points: newPoints,
        hotResults: state.hotResults,
        rpsResults: state.rpsResults,
      });
      return { points: newPoints };
    });
  },
  addHOTResult(result) {
    set((state) => {
      const newResults = [...state.hotResults, result];
      saveState({
        points: state.points,
        hotResults: newResults,
        rpsResults: state.rpsResults,
      });
      return { hotResults: newResults };
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
    }

    return null;
  },
  addRPSResult() {
    set((state) => {
      const isWon = state.userScores > state.botScores;
      const outcome = isWon ? state.spend * 2 : 0;

      const result = {
        userScore: state.userScores,
        botScore: state.botScores,
        spend: state.spend,
        isWon,
        outcome,
      };

      const newResults = [...state.rpsResults, result];

      set({ currentRPSResult: result });

      saveState({
        points: state.points,
        hotResults: state.hotResults,
        rpsResults: newResults,
      });
      return { rpsResults: newResults };
    });
  },
  setRPSResult({
    userMove,
    botMove,
    spend,
  }: {
    userMove: number;
    botMove: number;
    spend: number;
  }): RPSResult | null {
    const winConditions = [
      [0, 2], // Rock beats Scissors
      [1, 0], // Paper beats Rock
      [2, 1], // Scissors beats Paper
    ];
    const isWon = winConditions.some(
      (condition) => condition[0] === userMove && condition[1] === botMove
    );

    set((state) => {
      return {
        userScores: isWon ? state.userScores + 1 : state.userScores,
        botScores: isWon ? state.botScores : state.botScores + 1,
        gameCount: state.gameCount + 1,
        spend,
      };
    });

    return {
      userScore: isWon ? 1 : 0,
      botScore: isWon ? 0 : 1,
      spend,
      isWon,
    };
  },
  resetMove() {
    set((state) => {
      return {
        userMoves: [],
        botMoves: [],
      };
    });
  },
  resetRPS() {
    set({
      userScores: 0,
      botScores: 0,
      gameCount: 0,
      spend: 0,
    });
  },
  addMove(move, isUserMove) {
    set((state) => {
      const newMoves = isUserMove
        ? [...state.userMoves, move]
        : [...state.botMoves, move];

      if (state.userScores >= 3 || state.botScores >= 3) {
        state.addRPSResult();
        state.resetRPS();
        state.resetMove();
      } else if (state.gameCount >= 3) {
        console.log("setting state");
        state.addRPSResult();
        state.resetRPS();
        state.resetMove();
      }

      return isUserMove ? { userMoves: newMoves } : { botMoves: newMoves };
    });
  },
}));

export default useOwlTWAStore;
