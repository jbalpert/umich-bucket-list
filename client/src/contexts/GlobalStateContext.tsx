import React, { createContext, useContext, useState } from "react";
import { IGlobalState, IError, IEvent } from "../types";
import { useGoogleLogin } from "@react-oauth/google";
import { AxiosError } from "axios";
import { authApi } from "../api/auth";
import { eventApi } from "../api/event";
import { UseUser } from "./UserContext";

// Default values for global state
const GlobalStateContext = createContext<IGlobalState>({
  loading: false,
  setLoading: () => {},
  isFirstLogin: true,
  setIsFirstLogin: () => {},
  isErrorOpen: false,
  setIsErrorOpen: () => {},
  error: null,
  setError: () => {},
  events: [],
  setEvents: () => {},
  isSettingsOpen: false,
  setIsSettingsOpen: () => {},
  isEventOpen: false,
  setIsEventOpen: () => {},
  eventModalId: -1,
  setEventModalId: () => {},
  isEventFormOpen: false,
  setIsEventFormOpen: () => {},
  rsvpHandler: () => Promise.resolve(),
  unrsvpHandler: () => Promise.resolve(),
  googleLogin: () => {},
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
  const [eventModalId, setEventModalId] = useState<number>(-1);
  const [user, setUser] = UseUser();
  const [isEventFormOpen, setIsEventFormOpen] = useState<boolean>(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        setLoading(true);
        const {
          data: { userFromDB, isNewUser },
        } = await authApi.google(code);
        setUser(userFromDB);
        localStorage.setItem("user", JSON.stringify(userFromDB));
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

  const rsvpHandler = async (event_id: string) => {
    if (!user) {
      googleLogin();
    }
    if (!user) return;
    await eventApi.rsvpEvent(event_id, user._id);
    setUser({ ...user, events: [...user.events, event_id] });
    // add user id to rsvp list
    setEvents(
      events.map((event) => {
        if (event._id === event_id) {
          return {
            ...event,
            joined: true,
            rsvps: [...event.rsvps, { userid: user._id }],
          };
        }
        return event;
      })
    );
  };

  const unRsvpHandler = async (event_id: string) => {
    if (!user) {
      googleLogin();
    }
    if (!user) return;
    await eventApi.unrsvpEvent(event_id, user._id);
    setUser({ ...user, events: user.events.filter((e) => e !== event_id) });
    setEvents(
      events.map((event) => {
        if (event._id === event_id) {
          return {
            ...event,
            joined: false,
            rsvps: event.rsvps.filter((rsvp) => rsvp.userid !== user._id),
          };
        }
        return event;
      })
    );
  };

  const globalState = {
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
    eventModalId: eventModalId,
    setEventModalId: setEventModalId,

    // Event Form Modal
    isEventFormOpen: isEventFormOpen,
    setIsEventFormOpen: setIsEventFormOpen,

    // rsvp
    rsvpHandler: rsvpHandler,
    unrsvpHandler: unRsvpHandler,

    // Google Login Function
    googleLogin: googleLogin,
  };

  return <GlobalStateContext.Provider value={globalState}>{children}</GlobalStateContext.Provider>;
};

// create hook
const UseGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// export
export { GlobalStateProvider, UseGlobalState };
