import React from "react";
import Navbar from "./navbar/Navbar";
import SettingsModal from "../modals/settings/SettingsModal";
import Modal from "../modals/Modal";
import { useState } from "react";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <>
      <div>
        <Navbar setSettingsOpen={setIsSettingsOpen} setFirstLogged={setIsFirstLogin} />
        {isSettingsOpen && (
          <Modal isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen}>
            <SettingsModal
              isFirstLogin={isFirstLogin}
              setSettingsOpen={setIsSettingsOpen}
              setIsFirstLogin={setIsFirstLogin}
            />
          </Modal>
        )}
        {children}
      </div>
    </>
  );
};

export default Layout;
