import React, { useEffect } from "react";

import { UseGlobalState } from "../../contexts/GlobalStateContext";
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
  const { setEvents, loading, setLoading, isErrorOpen, isSettingsOpen, events } = UseGlobalState();
  useEffect(() => {
    setLoading(true);
    eventApi
      .getCurrentEvents()
      .then((res) => {
        console.log(res.data);
        setEvents(res.data as IEvent[]);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.log(events);
  return (
    <>
      <div>
        <Navbar />
        {isErrorOpen && <ErrorModal />}
        {isSettingsOpen && <SettingsModal />}
        {children}
      </div>
    </>
  );
};

export default Layout;
