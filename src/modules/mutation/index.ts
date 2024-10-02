import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL } from "../../utils/config";
import axios from "axios";

export function useRegisterUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      username,
      userTelegramId,
      refTelegramId,
      profilePicture,
    }: {
      username: string;
      userTelegramId: number;
      refTelegramId?: number;
      profilePicture: string;
    }) => {
      try {
        const response = await axios.post(`${BACKEND_URL}/auth/register`, {
          telegramId: userTelegramId,
          username,
          referralTelegramId: refTelegramId,
          profilePicture,
        });
        return response.data;
      } catch (error) {
        // console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}

export function usePurchaseUsingPointsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      points,
      userTelegramId,
    }: {
      points: number;
      userTelegramId: number;
    }) => {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/rewards/purchase-using-points`,
          {
            telegramId: userTelegramId,
            points,
          }
        );
        return response.data;
      } catch (error) {
        // console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}

export function useClaimRewardsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      points,
      userTelegramId,
    }: {
      points: number;
      userTelegramId: number;
    }) => {
      console.log({ points, userTelegramId });
      try {
        const response = await axios.post(
          `${BACKEND_URL}/rewards/update-reward`,
          {
            telegramId: userTelegramId,
            points,
          }
        );
        return response.data;
      } catch (error) {
        // console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}

// syntax
export function useMutationExample() {
  // call needed functions

  return useMutation({
    mutationFn: async () => {
      // your mutation logic here
    },
    onSuccess: (data, variables, context) => {
      // your success callback here
    },
    onError: (error, variables, context) => {
      // your error callback here
    },
    // other options like retry, etc.
  });
}
