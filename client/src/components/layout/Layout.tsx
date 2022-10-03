import React from "react";
import Navbar from "./navbar/Navbar";
import SettingsModal from "../modals/settings/SettingsModal";
import Modal from "../modals/Modal";
import { useGoogleLogin } from "@react-oauth/google";
import { authApi } from "../../api/auth";
import { useState } from "react";
import { UseUser } from "../../contexts/UserContext";
import EventHero from "../events/EventHero";
// type Props = {
//   children: React.ReactNode;
// };

// TODO have layout be a wrapper for all pages, -> need to have global state management first

const Layout: React.FC /*<Props>*/ = (/*{ children }*/) => {
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [, setUser] = UseUser();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const {
        data: { userFromDB, isNewUser },
      } = await authApi.google(code);
      setUser(userFromDB);
      setIsFirstLogin(isNewUser);
      setIsSettingsOpen(isNewUser);
    },
    flow: "auth-code",
  });
  return (
    <>
      <div>
        <Navbar
          setSettingsOpen={setIsSettingsOpen}
          setFirstLogged={setIsFirstLogin}
          googleLogin={googleLogin}
        />
        {isSettingsOpen && (
          <Modal isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen}>
            <SettingsModal
              isFirstLogin={isFirstLogin}
              setSettingsOpen={setIsSettingsOpen}
              setIsFirstLogin={setIsFirstLogin}
            />
          </Modal>
        )}
        <EventHero googleLogin={googleLogin} />
      </div>
    </>
  );
};

export default Layout;
