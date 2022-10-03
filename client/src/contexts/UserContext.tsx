// import context from react
import React, { createContext, useContext, useState } from "react";
import { IUserContext, IUser } from "../types";
// create context
const UserContext = createContext<IUserContext>([null, () => {}]);
// create provider

type Props = {
  children?: React.ReactNode;
};

const UserProvider: React.FC<Props> = ({ children }) => {
  const userDatum = useState<IUser | null>(null);
  return <UserContext.Provider value={userDatum}>{children}</UserContext.Provider>;
};
// create hook
const UseUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// export
export { UserProvider, UseUser };
