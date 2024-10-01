import React, { createContext, useContext, useState, useEffect } from "react";

declare global {
  interface Window {
    Telegram: any;
  }
}

// Define the interface for the context
interface TelegramContextType {
  firstName: string;
  userPhoto: string | null;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
  userTelegramId: string;
}

// Create the Telegram context
const TelegramContext = createContext<TelegramContextType | undefined>(
  undefined
);

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firstName, setFirstName] = useState<string>("Mate");
  const [userTelegramId, setUserTelegramId] = useState<string>("");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      if (window.Telegram.WebApp.initDataUnsafe?.user) {
        let startParam =
          window.Telegram.WebApp.initDataUnsafe.start_param || "None";
        alert(`Hi, You were invited by ${startParam}`);

        const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;

        setFirstName(telegramUser.first_name || "Mate");
        setUserTelegramId(telegramUser.id.toString());

        if (telegramUser.id) {
          // Fetching profile photo using a server-side API
          fetchUserProfilePhoto(telegramUser.id).then((photoUrl) => {
            if (photoUrl) setUserPhoto(photoUrl);
          });
        }
      } else {
        setUserTelegramId("");
        setFirstName("Mate");
      }
    } else {
      console.error("Telegram WebApp not available");
    }
  }, []);

  const tg = window.Telegram?.WebApp;

  const handleClose = () => {
    tg?.close();
  };

  // Function to fetch user's profile photo from server-side API
  const fetchUserProfilePhoto = async (userId: number) => {
    try {
      const response = await fetch(`/api/getUserProfilePhoto?userId=${userId}`);
      const data = await response.json();

      if (data.success && data.photoUrl) {
        return data.photoUrl;
      } else {
        console.log("No profile photo available.");
      }
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
    return null;
  };

  return (
    <TelegramContext.Provider
      value={{
        firstName,
        userPhoto,
        setFirstName,
        handleClose,
        userTelegramId,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegramContext = (): TelegramContextType => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error(
      "useTelegramContext must be used within a TelegramProvider"
    );
  }
  return context;
};
