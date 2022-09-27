import React from "react";
import type { User } from "types/api";

const UserContext = React.createContext<User | null>(null);

interface UserProviderProps extends React.PropsWithChildren {
  value?: User;
}

function UserProvider({ children, value }: UserProviderProps): JSX.Element {
  return (
    <UserContext.Provider value={value ?? null}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const value = React.useContext(UserContext);

  if (!value) {
    throw new Error(
      "The user has not been found. Use the authentication middleware."
    );
  }

  return value;
}

export { useUser };
export default UserProvider;
