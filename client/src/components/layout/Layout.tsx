import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import SettingsModal from "../modals/settings/SettingsModal";
import ErrorModal from "../modals/error/ErrorModal";
import { useGoogleLogin } from "@react-oauth/google";
import { authApi } from "../../api/auth";
import { useState } from "react";
import { UseUser } from "../../contexts/UserContext";
import EventHero from "../events/EventHero";
import Loading from "../Loading";
import { AxiosError } from "axios";
// type Props = {
//   children: React.ReactNode;
// };

// TODO have layout be a wrapper for all pages, -> need to have global state management first
// TODO have a loading screen for when the user is being fetched

type ErrorProps = {
  errorHeader: string;
  errorDescription: string;
};

const Layout: React.FC /*<Props>*/ = (/*{ children }*/) => {
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [, setUser] = UseUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorProps>({
    errorHeader: "",
    errorDescription: "",
  });
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

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
              errorHeader: "Email Error",
              errorDescription: "You must use a UMich email to login 〽️ go blue!",
            });
            setIsErrorOpen(true);
          }
          console.log("welp");
        } else {
          setError({
            errorHeader: "Error logging in",
            errorDescription: "Please try again later",
          });
          setIsErrorOpen(true);
        }
        console.log(err);
      }
    },
    flow: "auth-code",
  });
  if (loading) {
    return <Loading setLoading={setLoading} />;
  }
  return (
    <>
      <div>
        <Navbar
          setSettingsOpen={setIsSettingsOpen}
          setFirstLogged={setIsFirstLogin}
          googleLogin={googleLogin}
        />
        {isErrorOpen && (
          <ErrorModal
            error={error}
            setError={setError}
            setErrorOpen={setIsErrorOpen}
            errorOpen={isErrorOpen}
          />
        )}
        {isSettingsOpen && (
          <SettingsModal
            isFirstLogin={isFirstLogin}
            isOpen={isSettingsOpen}
            setSettingsOpen={setIsSettingsOpen}
            setIsFirstLogin={setIsFirstLogin}
          />
        )}
        <EventHero googleLogin={googleLogin} setLoading={setLoading} />
      </div>
    </>
  );
};

export default Layout;
