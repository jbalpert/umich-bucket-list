import React, { useEffect } from "react";

import { UseUser } from "../../contexts/UserContext";
import { GlobalStateProvider, UseGlobalState } from "../../contexts/GlobalStateContext";
import Navbar from "./navbar/Navbar";
import Loading from "../Loading";
import SettingsModal from "../modals/settings/SettingsModal";
import ErrorModal from "../modals/error/ErrorModal";
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
    setIsFirstLogin,
    setIsSettingsOpen,
    isErrorOpen,
    isSettingsOpen,
    googleLogin,
    events,
  } = UseGlobalState();
  useEffect(() => {
    setLoading(true);
    eventApi
      .getCurrentEvents()
      .then((res) => {
        console.log(res.data);
        setEvents(res.data as IEvent[]);
        console.log(events);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <GlobalStateProvider>
        <div>
          <Navbar />
          {isErrorOpen && <ErrorModal />}
          {isSettingsOpen && <SettingsModal />}
          {children}
        </div>
      </GlobalStateProvider>
    </>
  );
};

export default Layout;
