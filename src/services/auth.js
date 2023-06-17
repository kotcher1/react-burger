import { createContext } from 'react';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}