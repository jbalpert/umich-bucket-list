import React, { useEffect } from "react";

import { UseUser } from "../../contexts/UserContext";
import { UseGlobalState } from "../../contexts/GlobalStateContext";
import Navbar from "./navbar/Navbar";
import Loading from "../Loading";
import SettingsModal from "../modals/settings/SettingsModal";
import ErrorModal from "../modals/error/ErrorModal";
import EventModal from "../modals/event/EventModal";
import { eventApi } from "../../api/event";
import { IEvent } from "../../types";
type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const {
    setEvents,
    loading,
    setLoading,
    isErrorOpen,
    isSettingsOpen,
    events,
    isEventOpen,
    setIsEventOpen,
    setEventModalId,
  } = UseGlobalState();

  const [_, setUser] = UseUser();
  useEffect(() => {
    setLoading(true);

    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") || "") || null);
    }

    eventApi
      .getCurrentEvents()
      .then((res) => {
        setEvents(res.data as IEvent[]);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params && params.get("event")) {
      const eventId = params.get("event");
      const eventIndex = events.findIndex((event) => event._id === eventId);
      if (eventIndex !== -1) {
        setEventModalId(eventIndex);
        setIsEventOpen(true);
        window.history.replaceState({}, document.title, "/");
      }
    }
  }, [events]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div>
        <Navbar />
        {isErrorOpen && <ErrorModal />}
        {isSettingsOpen && <SettingsModal />}
        {isEventOpen && <EventModal />}
        {children}
      </div>
    </>
  );
};

export default Layout;
