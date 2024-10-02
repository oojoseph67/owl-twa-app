import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL } from "../../utils/config";
import axios from "axios";
import { useTelegramContext } from "../../context/TelegramContext";

export interface UserInterface {
  username: string;
  telegramId: string;
  walletAddress: string;
  points: number;
  diamonds: number;
  lastClaimDate: Date;
  referredBy: string;
  profilePicture: string;
}

export interface GameDataInterface {
  userId: number;
  userLevel: number;
  apeLevel: number;
}

export function useGetUserQuery({
  userTelegramId,
}: {
  userTelegramId: string | number;
  }) {
  
  console.log('user query', userTelegramId)
  
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/user/${userTelegramId}/user`
        );

        console.log({ response })

        const userData = response.data.user as UserInterface;
        const gameData = response.data.game as GameDataInterface;

        return { userData, gameData };
      } catch (error: any) {
        console.log({ error })
        if (error.status === 404) {
          return error;
        } else {
          throw error;
        }
      }
    },
    enabled: true,
    refetchInterval: 5000,
  });
}

export function useGetLeaderboardQuery() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/leaderboard`);
        return response.data as UserInterface[];
      } catch (error) {
        throw error;
      }
    },
    enabled: true,
    refetchInterval: 60000,
  });
}

export function useGetUserReferralQuery({
  userTelegramId,
}: {
  userTelegramId: string | number;
}) {
  return useQuery({
    queryKey: ["userReferral"],
    queryFn: async () => {
      if (!userTelegramId) return null;
      try {
        const response = await axios.get(
          `${BACKEND_URL}/user/${userTelegramId}/referral`
        );
        return response.data.users as UserInterface[];
      } catch (error) {
        throw error;
      }
    },
    enabled: !!userTelegramId,
    refetchInterval: 60000,
  });
}

// syntax
export function useQueryExample() {
  // call needed functions

  return useQuery({
    queryKey: ["exampleQueryKey"],
    queryFn: async () => {},
    initialData: null,
    enabled: true,
    refetchInterval: 60000, // refetch every minute
  });
}
