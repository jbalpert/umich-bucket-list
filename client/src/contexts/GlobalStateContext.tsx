import React, { createContext, useContext, useState } from "react";
import { IGlobalState, IError, IEvent } from "../types";
import { useGoogleLogin } from "@react-oauth/google";
import { AxiosError } from "axios";
import { authApi } from "../api/auth";
import { UseUser } from "./UserContext";

const GlobalStateContext = createContext<IGlobalState>({
  loading: false,
  isFirstLogin: true,
  setLoading: () => {},
  isErrorOpen: false,
  events: [],
  isSettingsOpen: false,
  isEventOpen: false,
  error: null,
  setError: () => {},
  googleLogin: () => {},
  setIsErrorOpen: () => {},
  setEvents: () => {},
  setIsSettingsOpen: () => {},
  setIsEventOpen: () => {},
  setIsFirstLogin: () => {},
  setEventModalData: () => {},
  eventModalData: null,
});

type Props = {
  children?: React.ReactNode;
};

// TODO have a cleaner global state management
const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>({
    header: "",
    message: "",
  });
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const [isEventOpen, setIsEventOpen] = useState<boolean>(false);
  const [eventModalData, setEventModalData] = useState<IEvent | null>(null);
  const [_, setUser] = UseUser();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        setLoading(true);
        const {
          data: { userFromDB, isNewUser },
        } = await authApi.google(code);
        setUser(userFromDB);
        setIsFirstLogin(isNewUser);
        setIsSettingsOpen(isNewUser);
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          if (err.response?.data.errors.email.name === "ValidatorError") {
            setError({
              header: "Email Error",
              message: "You must use a UMich email to login 〽️ go blue!",
            });
            setIsErrorOpen(true);
          }
        } else {
          setError({
            header: "Error logging in",
            message: "Please try again later",
          });
          setIsErrorOpen(true);
        }
        console.log(err);
      }
    },
    flow: "auth-code",
  });

  return (
    <GlobalStateContext.Provider
      value={{
        // Global is new user
        isFirstLogin: isFirstLogin,
        setIsFirstLogin: setIsFirstLogin,
        // Loading
        loading: loading,
        setLoading: setLoading,
        // Settings
        isSettingsOpen: isSettingsOpen,
        setIsSettingsOpen: setIsSettingsOpen,
        // Errors
        error: error,
        setError: setError,
        isErrorOpen: isErrorOpen,
        setIsErrorOpen: setIsErrorOpen,
        // Events
        events: events,
        setEvents: setEvents,
        // Event Modal
        isEventOpen: isEventOpen,
        setIsEventOpen: setIsEventOpen,
        eventModalData: eventModalData,
        setEventModalData: setEventModalData,
        // Google Login Function
        googleLogin: googleLogin,
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// create hook
const UseGlobalState = () => {
  const context = useContext(GlobalStateContext);
  console.log(context);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// export
export { GlobalStateProvider, UseGlobalState };
